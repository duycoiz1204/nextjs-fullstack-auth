import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import React from 'react';

type Props = {
  params: Params;
};

export default function ProfilePage({ params }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="p-2 rounded bg-orange-400">{params.id}</span>
      </p>
    </div>
  );
}
