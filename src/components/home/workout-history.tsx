import { Link } from '@tanstack/react-router'
import { differenceInSeconds, formatDate } from 'date-fns'
import { ChevronRightIcon, CirclePlayIcon, HistoryIcon } from 'lucide-react'

import type { workout } from '#/db/schema'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '#components/ui/item'
import { formatHhMmSs } from '#lib/workout/utils'

import { Subheading } from '../typography'

export function WorkoutHistory({ workouts }: { workouts: (typeof workout.$inferSelect)[] }) {
  return (
    <div className="flex flex-col gap-4">
      <Subheading className="text-center">History</Subheading>
      <ItemGroup className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {workouts.map((workout) => (
          <Item
            key={workout.id}
            render={<Link to="/workout/$publicId" params={{ publicId: workout.publicId }} />}
            variant="outline"
          >
            <ItemMedia variant="icon">
              {workout.isActive ? <CirclePlayIcon color="var(--warning)" /> : <HistoryIcon />}
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{workout.title}</ItemTitle>
              <ItemDescription>{formatDate(workout.createdAt, 'EEE, dd MMM yyyy')}</ItemDescription>
              {workout.finishedAt ? (
                <ItemDescription>
                  {formatHhMmSs(
                    Math.max(
                      0,
                      differenceInSeconds(
                        new Date(workout.finishedAt),
                        new Date(workout.startedAt),
                      ),
                    ),
                  )}
                </ItemDescription>
              ) : (
                <ItemDescription className="text-destructive">
                  You haven't finished this session.
                </ItemDescription>
              )}
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon />
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
