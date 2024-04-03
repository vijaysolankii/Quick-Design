import React, { useMemo } from "react";
import { Avatar } from "./Avatar";
import { RoomProvider, useOthers, useOthersConnectionIds, useSelf } from "@/liveblocks.config";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { generateRandomName } from "@/lib/utils";

const ActiveUsers = () => {
  const users = useOthersConnectionIds();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  const memoized = useMemo(() => {
    return (
      <main className="flex items-center justify-center gap-1">
        <div className="flex pl-3">
          {currentUser && (
              <Avatar otherStyle={'border-[3px] border-primary-green'} name="You" />
          )}
          {users.slice(0, 3).map(({ connectionId }) => {
            return (
              <Avatar key={connectionId} otherStyle={'-ml-3'} name={generateRandomName()} />
            );
          })}
          {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}
        </div>
      </main>
    );
  },[users.length])

  return memoized
}

export default ActiveUsers