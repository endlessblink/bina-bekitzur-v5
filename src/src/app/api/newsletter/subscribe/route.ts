import { NextResponse } from 'next/server';

const BINA_BEKITZUR_GROUP_ID = '145117723516471011';

async function getGroups(apiKey: string) {
  try {
    const response = await fetch('https://connect.mailerlite.com/api/groups', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Available MailerLite Groups:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Failed to fetch groups:', error);
    return null;
  }
}

async function addToGroup(apiKey: string, subscriberId: string) {
  try {
    const response = await fetch(`https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${BINA_BEKITZUR_GROUP_ID}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('Add to group response:', await response.text());
    return response.ok;
  } catch (error) {
    console.error('Failed to add to group:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    
    if (!email) {
      console.log('Missing email in request');
      return NextResponse.json(
        { error: 'נא להזין כתובת אימייל' },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    
    if (!apiKey) {
      console.error('Missing MAILERLITE_API_KEY environment variable');
      return NextResponse.json(
        { error: 'תקלה בהגדרות המערכת' },
        { status: 500 }
      );
    }

    // Fetch available groups first
    await getGroups(apiKey);

    console.log('Attempting to subscribe:', { email, name });

    // Add new subscriber to MailerLite
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        ...(name ? { fields: { name } } : {}),
        status: 'active'
      })
    });

    let responseData;
    const responseText = await response.text();
    console.log('Raw response:', responseText);
    
    try {
      responseData = JSON.parse(responseText);
    } catch {
      console.error('Failed to parse response as JSON:', responseText);
      responseData = { message: responseText };
    }

    console.log('MailerLite API Response Status:', response.status);
    console.log('MailerLite API Response Headers:', Object.fromEntries(response.headers.entries()));
    console.log('MailerLite API Response Data:', JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      // Handle specific error cases
      switch (response.status) {
        case 401:
          console.error('Authentication failed with MailerLite');
          return NextResponse.json({ error: 'תקלה באימות מול השירות' }, { status: 401 });
        case 403:
          console.error('Access forbidden by MailerLite');
          return NextResponse.json({ error: 'אין הרשאה לביצוע הפעולה' }, { status: 403 });
        case 422:
          console.error('Validation error from MailerLite:', responseData);
          if (responseData.message?.includes('has already been taken')) {
            // If email exists, try to update instead
            const updateResponse = await fetch(`https://connect.mailerlite.com/api/subscribers/${email}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                fields: name ? { name } : undefined,
                status: 'active'
              })
            });

            if (updateResponse.ok) {
              // Try to add to group even for existing subscribers
              const updateData = await updateResponse.json();
              if (updateData.data?.id) {
                await addToGroup(apiKey, updateData.data.id);
              }
              return NextResponse.json({
                data: { message: 'פרטיך עודכנו בהצלחה!' }
              });
            }

            return NextResponse.json(
              { error: 'כתובת האימייל כבר רשומה למערכת' },
              { status: 422 }
            );
          }
          if (responseData.errors?.email) {
            return NextResponse.json(
              { error: 'כתובת האימייל אינה תקינה' },
              { status: 422 }
            );
          }
          return NextResponse.json(
            { error: 'הנתונים שהוזנו אינם תקינים' },
            { status: 422 }
          );
        case 429:
          console.error('Rate limit exceeded');
          return NextResponse.json(
            { error: 'נסו שוב בעוד מספר דקות' },
            { status: 429 }
          );
        default:
          console.error('Unexpected error from MailerLite:', {
            status: response.status,
            data: responseData
          });
          return NextResponse.json(
            { error: 'אירעה שגיאה בתהליך ההרשמה' },
            { status: 500 }
          );
      }
    }

    // If registration successful, add to group
    if (responseData.data?.id) {
      await addToGroup(apiKey, responseData.data.id);
    }

    console.log('Successfully subscribed:', email);
    return NextResponse.json({
      data: { message: 'נרשמת בהצלחה לניוזלטר!' }
    });
  } catch (error) {
    console.error('Newsletter Subscription Error:', error);
    return NextResponse.json(
      { error: 'אירעה שגיאה בלתי צפויה' },
      { status: 500 }
    );
  }
}
