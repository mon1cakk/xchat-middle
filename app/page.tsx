'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const ConnectTwitter = () => {
  const { data: session } = useSession();

  useEffect(() => {
    // 监听 session 变化
    if (session) {
      console.log('useSession 状态 >>', session);
      
      // 使用 postMessage 发送消息给打开此窗口的父窗口
      if (window.opener) {
        window.opener.postMessage({
          type: 'TWITTER_AUTH_SUCCESS',
          user: session.user
        }, '*'); // '*' 允许发送到任何域，您可以根据需要指定特定域
      }
      
      setTimeout(() => {
        window.close();
      }, 1000);
    }
  }, [session]);

  const xClick = async () => {
    if (session?.user && (session.user as { screen_name?: string })?.screen_name) {
      // 退出
      await signOut({ redirect: false });
      window.open('https://twitter.com/logout');
      if (window.opener) {
        window.opener.postMessage({ type: 'TWITTER_AUTH_LOGOUT' }, '*');
      }
    } else {
      // 登录
      try {
        await signIn('twitter');
      } catch (error) {
        console.error('Twitter authentication failed:', error);
        if (window.opener) {
          window.opener.postMessage({ type: 'TWITTER_AUTH_FAILURE' }, '*');
        }
      }
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
