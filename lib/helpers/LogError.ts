const LogError = (Errorr: any, ErrorAddr: string) => {
  console.trace({ Error: Errorr, ErrorAddr });
};

export default LogError;
