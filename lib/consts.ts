export const MinPassLength = parseInt(
  process.env.NEXT_PUBLIC_MIN_PASS_LEN || '8',
  10
);

export const ProxyUrl = process.env.NEXT_PUBLIC_PROXY_PRO;

// export const ProxyUrl =
//   process.env.NODE_ENV === 'development'
//     ? process.env.NEXT_PUBLIC_PROXY_DEV
//     : process.env.NEXT_PUBLIC_PROXY_PRO;
