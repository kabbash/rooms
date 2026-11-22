import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export type BookingRowProps = {
  room: string;
  location: string;
  date: string;
  time: string;
  icon: "room" | "seat";
  state: "upcoming" | "past";
  synced?: boolean;
  onChange?: () => void;
  onCancel?: () => void;
};

export function BookingRow({
  room,
  location,
  date,
  time,
  icon,
  state,
  synced = false,
  onChange,
  onCancel,
}: BookingRowProps) {
  const isPast = state === "past";

  return (
    <article className="flex w-[358px] flex-col items-start gap-3 rounded-lg border border-line bg-surface p-4 md:w-full md:max-w-[1044px] md:flex-row md:items-center md:gap-5 md:rounded-lg md:px-5 md:py-4">
      {" "}
      {/* Room / Seat information */}
      <div className="flex w-full min-w-0 items-center gap-3 md:flex-1">
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-md ${
            isPast ? "bg-muted" : "bg-brand-subtle"
          }`}
        >
          <Icon
            className={isPast ? "text-fg-tertiary" : "text-brand"}
            name={icon === "room" ? "door" : "armchair"}
            size={20}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <h3 className={`text-h3 ${isPast ? "text-fg-tertiary" : "text-fg"}`}>
            {room}
          </h3>

          <p className="text-label-sm text-fg-tertiary">{location}</p>
        </div>
      </div>
      {/* Date and Time */}
      <div className="flex w-full flex-wrap items-center gap-4 md:w-[200px] md:shrink-0 md:flex-col md:items-start md:gap-1">
        <div
          className={`flex items-center gap-2 text-label-md ${
            isPast ? "text-fg-tertiary" : "text-fg"
          }`}
        >
          <Icon name="calendar" size={16} />
          <span>{date}</span>
        </div>

        <div
          className={`flex items-center gap-2 text-label-md ${
            isPast ? "text-fg-tertiary" : "text-fg-secondary"
          }`}
        >
          <Icon name="clock" size={16} />
          <span>{time}</span>
        </div>
      </div>
      {/* Google Calendar sync */}
      {synced && (
        <div
          className={`hidden shrink-0 items-center gap-2 text-label-sm md:flex ${
            isPast ? "text-fg-tertiary" : "text-fg-secondary"
          }`}
        >
          <Icon name="refresh" size={16} />
          <span>In Google Calendar</span>
        </div>
      )}
      {/* Actions */}
      {!isPast && (
        <div className="flex w-full shrink-0 items-center gap-3 md:w-auto md:gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 rounded-md px-3 py-2 text-label-sm md:flex-none"
            onClick={onChange}
          >
            Change
          </Button>

          <Button
            variant="danger"
            size="sm"
            className="flex-1 rounded-md px-3 py-2 text-label-sm md:flex-none"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      )}
      {/* Completed: desktop only */}
      {isPast && (
        <span className="hidden shrink-0 text-label-sm text-fg-tertiary md:inline">
          Completed
        </span>
      )}
    </article>
  );
}
