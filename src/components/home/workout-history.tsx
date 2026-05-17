import { Link } from '@tanstack/react-router'
import { formatDate } from 'date-fns'
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

import { WorkoutDuration } from './workout-duration'

export function WorkoutHistory({ workouts }: { workouts: (typeof workout.$inferSelect)[] }) {
  return (
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
              <WorkoutDuration startedAt={workout.startedAt} finishedAt={workout.finishedAt} />
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
  )
}
