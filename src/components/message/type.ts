export type MessageStatus = 'success' | 'fail' | 'none'

export interface MessageProps {
  status?: MessageStatus;
  title: string;
}

export interface MessageStyle {
  backgroundColor: string;
  borderColor: string;
  color: string;
}
