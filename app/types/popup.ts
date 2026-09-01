import { StatusPopupType } from "../sections/StatusPopup";

export type PopupButton = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
};

export type PopupState = {
  type: StatusPopupType;
  title: string;
  messageId: string;
  messageEn: string;
  buttons: PopupButton[];
} | null;