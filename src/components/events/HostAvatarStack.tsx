import Image from "next/image";
import type { EventHost } from "@/types";

interface HostAvatarStackProps {
  hosts: EventHost[];
  ringClassName?: string;
}

const MAX_VISIBLE = 2;

export default function HostAvatarStack({ hosts, ringClassName = "ring-nyala-gray" }: HostAvatarStackProps) {
  if (hosts.length === 0) return null;

  const visibleHosts = hosts.slice(0, MAX_VISIBLE);
  const remaining = hosts.length - MAX_VISIBLE;

  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="flex shrink-0">
        {visibleHosts.map((host, i) =>
          host.avatarUrl ? (
            <Image
              key={host.name + i}
              src={host.avatarUrl}
              alt={host.name}
              width={24}
              height={24}
              className={`h-6 w-6 rounded-full object-cover ring-2 ${ringClassName} ${i > 0 ? "-ml-2" : ""}`}
            />
          ) : (
            <div
              key={host.name + i}
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-nyala-gray-light ring-2 ${ringClassName} ${i > 0 ? "-ml-2" : ""}`}
            >
              <span className="translate-y-px font-mono text-[10px] font-bold leading-none text-nyala-yellow">
                {host.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )
        )}
        {remaining > 0 && (
          <div
            className={`-ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-nyala-gray-light ring-2 ${ringClassName}`}
          >
            <span className="translate-y-px font-mono text-[9px] font-bold leading-none text-nyala-yellow">
              +{remaining}
            </span>
          </div>
        )}
      </div>
      <span
        className="min-w-0 truncate font-mono text-xs text-nyala-white/60"
        title={hosts.map((h) => h.name).join(", ")}
      >
        By {visibleHosts.map((h) => h.name).join(", ")}
        {remaining > 0 ? ` +${remaining} more` : ""}
      </span>
    </div>
  );
}
