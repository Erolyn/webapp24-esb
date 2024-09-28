import React from "react";

export type HeaderProps = {
  onPageAnchorClicked: (page: string) => void;
};

export default function Header(props: HeaderProps) {
  return (
    <header>
      <nav>
        <h1>LOGO</h1>
        <ul>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                props.onPageAnchorClicked("projects");
              }}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                props.onPageAnchorClicked("createProject");
              }}
            >
              Add Project
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                props.onPageAnchorClicked("contact");
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
