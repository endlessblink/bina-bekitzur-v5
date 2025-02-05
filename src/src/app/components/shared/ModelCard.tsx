import { Model } from '@/types'
import { Card } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

interface ModelCardProps {
  model: Model
  isSelected?: boolean
  onClick?: () => void
}

export function ModelCard({ model, isSelected, onClick }: ModelCardProps) {
  return (
    <Card
      hoverable
      className={`w-full cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-purple-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          {model.image ? (
            <Image
              src={model.image}
              alt={model.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <span className="text-gray-400">אין תמונה</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">{model.name}</h3>
          <p className="text-gray-600">{model.description}</p>

          {model.categories && model.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {model.categories.map((category) => (
                <span
                  key={`${model._id}-${category._id}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {model.websiteUrl && (
            <Link
              href={model.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-500 hover:text-blue-600"
            >
              בקר באתר
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}
