export enum LogLevel {
  info,
  success,
  wait,
  error,
  warning
}

export interface Message {
  logLevel: LogLevel;
  title: string;
  detail: string;
}
