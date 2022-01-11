import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconLink = (props) => (
  <a href={props.link}>
    <FontAwesomeIcon icon={props.icon} />
  </a>
);
