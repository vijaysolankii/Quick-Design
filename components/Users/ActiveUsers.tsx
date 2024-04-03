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

  return (
    <main className="flex h-screen w-full select-none place-content-center place-items-center">
      <div className="flex pl-3">
        {currentUser && (
            <Avatar otherStyle={'border-[3px] border-primary-green'} name="You" />
        )}
        {users.slice(0, 3).map(({ connectionId, info }) => {
          return (
            <Avatar key={connectionId} otherStyle={'-ml-3'} name={generateRandomName()} />
          );
        })}

        {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}

        
      </div>
    </main>
  );
}

export default ActiveUsers