export const Regex = {
  BRAND_COLOR_REGEX: /^#?[A-Fa-f0-9]{6}$/,
  URL_REGEX: /^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_\=]*)?$/,
  PHONE_REGEX: /^\+[1-9]\d{1,14}$/,
  EMAIL_REGEX: /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  SMARTLY_API_SKILL_ID_REGEX: /^[0-9A-Fa-f]{24}$/,
  TEXT_NEVER_START_WITH_WHITE_SPACES: /^[^\s]/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[}{><@$!%#=()*^?&_\.:;,\\~\\-])[A-Za-z\d}{><@$!%#^=()*?&_\.:;,\\~\\-]{8,}$/,
  NO_HTML_TAGS_REGEX: /^[^<>]+$/,
  NEW_DOMAIN_REGEX: /^[A-Za-z0-9 _-]{0,20}$/,
  JSON_WITH_DOUBLE_QUOTES_REGEX: /({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g
}
