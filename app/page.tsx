'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
const ConnectTwitter = () => {
  console.log('ConnectTwitter');
    const { data: session } = useSession();
    const xClick  = () => {
      if(session?.user && (session.user as { screen_name?: string })?.screen_name){
        // 退出
        signOut({ redirect: false });
        window.open('https://twitter.com/logout') // 根据需要执行
      }else{
        // 登陆
        signIn('twitter');
      }
    }
    return (
        <div>
            <button onClick={xClick}>
                {session ? '登出' : '登录'}
            </button>
            {/* 其他内容 */}
            {session ? (
                session.user?.name || '未登录'
            ) : (
                '加载中...'
            )}
        </div>
    );
};
export default ConnectTwitter;
