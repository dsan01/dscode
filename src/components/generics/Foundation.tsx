import { FoundationType } from "@data/enums";
import { type FoundationProps } from "@data/props";

const FoundationIcon = (props: FoundationProps) => {
  const {
    Foundation,
    ClassSize = "size-4",
    ClassColor = "fill-primary-800",
  } = props;

  switch (Foundation) {
    case FoundationType.Desing:
      return (
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={ClassSize}
        >
          <g clipPath="url(#clip0_119_365)">
            <mask
              id="mask0_119_365"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="200"
              height="200"
            >
              <path d="M200 0H0V200H200V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_119_365)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M132.136 164.537C122.432 180.711 110.697 188 100 188C89.3026 188 77.5678 180.711 67.8635 164.537C58.3025 148.602 52 125.813 52 100C52 74.1867 58.3025 51.3982 67.8635 35.4633C77.5678 19.2895 89.3026 12 100 12C110.697 12 122.432 19.2895 132.136 35.4633C141.697 51.3982 148 74.1867 148 100C148 125.813 141.697 148.602 132.136 164.537ZM200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200C155.228 200 200 155.228 200 100ZM12 100C12 135.93 33.5326 166.83 64.3973 180.5C49.5982 162.289 40 133.013 40 100C40 66.9873 49.5982 37.7108 64.3973 19.4995C33.5326 33.1701 12 64.0704 12 100ZM188 100C188 135.93 166.467 166.83 135.603 180.5C150.402 162.289 160 133.013 160 100C160 66.9873 150.402 37.7108 135.603 19.4995C166.467 33.1701 188 64.0704 188 100ZM100 111C106.075 111 111 106.075 111 100C111 93.9249 106.075 89 100 89C93.9249 89 89 93.9249 89 100C89 106.075 93.9249 111 100 111Z"
                className={ClassColor}
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_119_365">
              <rect width="200" height="200" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );

    case FoundationType.Develop:
      return (
        <svg
          className={ClassSize}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_119_366)">
            <mask
              id="mask0_119_366"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="200"
              height="200"
            >
              <path d="M200 0H0V200H200V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_119_366)">
              <path
                d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z"
                className={ClassColor}
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_119_366">
              <rect width="200" height="200" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );

    case FoundationType.Managment:
      return (
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={ClassSize}
        >
          <g clipPath="url(#clip0_119_364)">
            <mask
              id="mask0_119_364"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="200"
              height="200"
            >
              <path d="M200 0H0V200H200V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_119_364)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M120 0H80V51.7157L43.4315 15.1472L15.1472 43.4314L51.7158 80H0V120H51.7157L15.1472 156.568L43.4315 184.853L80 148.284V200H120V148.284L156.569 184.853L184.853 156.569L148.284 120H200V80H148.284L184.853 43.4314L156.569 15.1471L120 51.7157V0Z"
                className={ClassColor}
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_119_364">
              <rect width="200" height="200" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );

    case FoundationType.Data:
      return (
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={ClassSize}
        >
          <g clipPath="url(#clip0_807_1411)">
            <mask
              id="mask0_807_1411"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="200"
              height="200"
            >
              <path d="M200 0H0V200H200V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_807_1411)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M100 33.6449C92.7738 33.6449 86.9159 39.5028 86.9159 46.729H53.271C53.271 20.9213 74.1923 0 100 0C125.808 0 146.729 20.9213 146.729 46.729C146.729 72.5367 125.808 93.4579 100 93.4579V59.8131C107.226 59.8131 113.084 53.9551 113.084 46.729C113.084 39.5028 107.226 33.6449 100 33.6449ZM166.355 100C166.355 92.7738 160.497 86.9159 153.271 86.9159V53.271C179.079 53.271 200 74.1923 200 100C200 125.808 179.079 146.729 153.271 146.729C127.463 146.729 106.542 125.808 106.542 100H140.187C140.187 107.226 146.045 113.084 153.271 113.084C160.497 113.084 166.355 107.226 166.355 100ZM46.729 113.084C39.5028 113.084 33.6449 107.226 33.6449 100C33.6449 92.7738 39.5028 86.9159 46.729 86.9159C53.9551 86.9159 59.8131 92.7738 59.8131 100H93.4579C93.4579 74.1923 72.5367 53.271 46.729 53.271C20.9213 53.271 0 74.1923 0 100C0 125.808 20.9213 146.729 46.729 146.729V113.084ZM100 166.355C107.226 166.355 113.084 160.497 113.084 153.271H146.729C146.729 179.079 125.808 200 100 200C74.1923 200 53.271 179.079 53.271 153.271C53.271 127.463 74.1923 106.542 100 106.542V140.187C92.7738 140.187 86.9159 146.045 86.9159 153.271C86.9159 160.497 92.7738 166.355 100 166.355Z"
                className={ClassColor}
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_807_1411">
              <rect width="200" height="200" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );

    default:
      return <p>Seleccionar un Prop Valido</p>;
  }
};

export default FoundationIcon;
