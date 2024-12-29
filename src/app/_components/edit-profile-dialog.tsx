'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import * as Form from '@radix-ui/react-form';
import { useUserStore } from '@/store';
import { ApiResponse } from '@/types';

export default function LoginDialog({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const inputStyle = 'justify-center align-center rounded-md border-2 border-gray w-[370px] h-[37px] p-2'
  const btnStyle = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-medium font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2 h-10 px-6  mt-4 bg-lime-green hover:bg-main-green border border-black text-dark-green font-extrabold'
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const updateUsername = async (userId: number, userName: string) => {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify({
          userId,
          username: userName,
        })
      });
      const json: ApiResponse<{ [index: string]: string | number }> = await response.json();
      return json.data?.username || null;
    } catch (e) {
      console.error(e);
    }
  }

    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby={undefined}
        className="w-[90%] sm:w-2/5 rounded-3xl sm:rounded-3xl p-0 border border-black outline-none"
        hasClose={false}
      >
        <DialogHeader className="relative bg-main-green py-5 flex flex-col gap-6 justify-center items-center border-b border-black rounded-t-3xl sm:rounded-t-3xl">
          <DialogTitle className="text-dark-green">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <div className="pt-2 pb-8 flex flex-col justify-center items-center gap-6">
          <Form.Root
            onSubmit={async (event) => {
              setIsLoading(true);
              const data = Object.fromEntries(new FormData(event.currentTarget));
              if (user) {
                event.preventDefault();
                const username = await updateUsername(user.id, data.username)
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                username && setUser({ ...user, username: username as string })
                setOpen(false);
              }
              setIsLoading(false);
            }}
            >
              <Form.Field className="grid mb-[10px]" name="username">
                <div className="flex align-baseline justify-between">
                  <Form.Label className="text-base font-semibold leading-9">Name</Form.Label>
                  <Form.Message className="text-[#b91c1c]" match="valueMissing">
                    Please enter your username
                  </Form.Message>
                </div>
                <Form.Control asChild defaultValue={user?.username}>
                    <input className={inputStyle} type="input" required/>
                </Form.Control>
              </Form.Field>
              <Form.Field className="grid mb-[10px]" name="account">
                  <div className="flex align-baseline justify-between">
                    <Form.Label className="text-base font-semibold leading-9">Github Account</Form.Label>
                  </div>
                  <Form.Control asChild defaultValue={user?.email}>
                    <input className={`${inputStyle} 'text-slate-400'`} type="input" disabled/>
                  </Form.Control>
              </Form.Field>
              <Form.Submit asChild>
                <div className="flex justify-center">
                  {
                    isLoading ? <Spinner className="w-6 h-6"/> :
                    <button
                      disabled={isLoading}
                      className={btnStyle}
                      style={{ marginTop: 10 }}>
                        Save Profile
                    </button>
                  }
                </div>
              </Form.Submit>
          </Form.Root>
        </div>
      </DialogContent>
    </Dialog>
    )
}
