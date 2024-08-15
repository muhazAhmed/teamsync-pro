export interface IconTypes {
  [key: string]: string;
}

export const Icon = (name: string) => {
  return <i className={icon[name]}></i>;
}

export const animatedIcon = (name: string, animation: string) => {
  const actualIcon = icon[name] + " " + "fa-" + animation;
  return actualIcon;
}

export const icon: IconTypes = {
  closeRounded: "fa-regular fa-circle-xmark",
  close: "fa-solid fa-xmark",
  plus: "fa-solid fa-plus",
  plusRounded: "fa-regular fa-circle-plus",
  user: "fa-solid fa-user",
  userRounded: "fa-solid fa-circle-user",
  notification: "fa-regular fa-bell",
  logout: "fa-solid fa-power-off text-red-500",
  calendar: "fa-regular fa-calendar",
  check: "fa-solid fa-check",
  checkRounded: "fa-solid fa-circle-check",
  checkList: "fa-solid fa-list-check",
  checkSquare: "fa-regular fa-square-check",
  house: "fa-solid fa-house",
  book: "fa-solid fa-book",
  help: "fa-regular fa-circle-question",
  trash: "fa-solid fa-trash-can",
  pencil: "fa-solid fa-pencil",
  refresh: "fa-solid fa-rotate",
  locked: "fa-brands fa-expeditedssl",
  chat: "fa-regular fa-comment",
  location: "fa-solid fa-location-dot",
  warning: "fa-solid fa-circle-exclamation",
  arrowRight: "fa-solid fa-arrow-right",
  arrowRightRounded: "fa-solid fa-circle-arrow-right",
  arrowLeft: "fa-solid fa-arrow-left",
  arrowLeftRounded: "fa-solid fa-circle-arrow-left",
  arrowUp: "fa-solid fa-arrow-up",
  arrowUpRounded: "fa-solid fa-circle-arrow-up",
  arrowDown: "fa-solid fa-arrow-down",
  arrowDownRounded: "fa-solid fa-circle-arrow-down",
  arrowOpen: "fa-solid fa-arrow-up-right-from-square",
  asterisk: "fa-solid fa-asterisk",
  reload: "fa-solid fa-arrow-rotate-right",
  sorting: "fa-solid fa-arrow-down-wide-short",
  expand: "fa-solid fa-up-right-and-down-left-from-center",
  minimize: "fa-solid fa-down-left-and-up-right-to-center",
  whatsApp: "fa-brands fa-whatsapp",
  camera: "fa-solid fa-camera",
  share: "fa-solid fa-share-nodes",
  phone: "fa-solid fa-phone",
  settings: "fa-solid fa-sliders",
  url: "fa-solid fa-link",
  hotSpot: "fa-solid fa-tower-broadcast",
  luggage: "fa-solid fa-suitcase-rolling",
  bookmark: "fa-regular fa-bookmark",
  bookmarkAfter: "fa-solid fa-bookmark",
  filter: "fa-solid fa-filter",
  work: "fa-solid fa-briefcase",
  search: "fa-solid fa-magnifying-glass",
  threeBars: "fa-solid fa-bars",
  twoBars: "fa-solid fa-grip-lines",
  bar: "fa-solid fa-minus",
  eye: "fa-solid fa-eye",
  clock: "fa-solid fa-clock",
  facebook: "fa-brands fa-facebook",
  twitter: "fa-brands fa-x-twitter",
  instagram: "fa-brands fa-instagram",
  linkedin: "fa-brands fa-linkedin",
  youtube: "fa-brands fa-youtube",
  google: "fa-brands fa-google",
  react: "fa-brands fa-react",
  node: "fa-brands fa-node",
  gitHub: "fa-brands fa-github",
  alphabetP: "fa-solid fa-p",
  alphabetA: "fa-solid fa-a",
  doubleCheck: "fa-solid fa-check-double",
  gear: "fa-solid fa-gear",
  rocket: "fa-solid fa-rocket",
  gears: "fa-solid fa-gears",
  send: "fa-solid fa-paper-plane",
  vacation: "fa-solid fa-umbrella-beach",
  warning2: "fa-solid fa-triangle-exclamation",
  download: "fa-solid fa-download",
  save: "fa-solid fa-floppy-disk",
  leftRounded: "fa-regular fa-circle-left",
  rightRounded: "fa-regular fa-circle-right",
  upRounded: "fa-regular fa-circle-up",
  downRounded: "fa-regular fa-circle-down",
  grid: "fa-solid fa-table-cells-large",
  list: "fa-solid fa-list",
  pin: "fa-solid fa-thumbtack",
  forward: "fa-solid fa-forward-step",
  info: "fa-solid fa-info",
  infoRounded: "fa-solid fa-circle-info",
  users: "fa-solid fa-users",
  image: "fa-regular fa-image",
  likeBefore: "fa-regular fa-heart",
  likeAfter: "fa-solid fa-heart",
  emoji: "fa-regular fa-face-smile-beam",
  ellipse: "fa-solid fa-ellipsis",
  chevronUp: "fa-solid fa-circle-chevron-up",
  chevronDown: "fa-solid fa-circle-chevron-down",
  chevronLeft: "fa-solid fa-circle-chevron-left",
  chevronRight: "fa-solid fa-circle-chevron-right",
  spinner: "fa-solid fa-spinner",
  fingerprint: "fa-solid fa-fingerprint",
  key: "fa-solid fa-key",

  // ============== With animations ===================
  loadingSpinner: "fa-solid fa-spinner fa-spin-pulse",

  // ===== All animation names ===========
  // 1. beat
  // 2. beat-fade
  // 3. bounce
  // 4. fade
  // 5. flip
  // 6. shake
  // 7. spin
  // 8. spin-pulse

  // To use animated icon:
  // import {animatedIcon} from "./Icons.tsx"
  // <i className={animatedIcon(spinner, spin-pulse)}></i>
};
