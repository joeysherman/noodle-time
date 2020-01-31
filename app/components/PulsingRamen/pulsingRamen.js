/**
 * Created by Joey on 9/22/2019.
 */

import React from 'react';
import styles from './styles.css';

export function PulsingRamen(props) {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.ramenSvg}
        height="64px"
        viewBox="0 0 128 128"
        width="64px"
        version="1.1"
        y="32px"
        x="32px"
      >
        <defs>
          <path
            id="b"
            d="m116.39 68.9c0 14.26-23.28 25.82-52.01 25.82-28.72 0-52-11.56-52-25.82s23.28-25.81 52-25.81c28.73-0.01 52.01 11.55 52.01 25.81z"
          />
        </defs>
        <path
          fill="#fff"
          d="m120.42 68.62c0.14-11.148-4.86-22.499-14.41-28.652-21.887-15.385-51.935-15.754-75.829-4.877-11.034 4.916-20.72 14.676-22.076 27.137-1.9984 5.847 1.3921 10.988 4.378 15.741 10.435 17.132 28.875 29.701 49.172 30.811 17.224 1.58 35.428-4.58 46.635-18.098 5.49-6.411 9.73-13.96 12.13-22.062z"
        />
        <path
          fill="#ed6c30"
          d="m64.78 31.59c16.107 0.04999 33.08 4.8821 44.589 16.627 4.8942 5.4178 6.8652 12.782 7.041 19.943-5.2625 17.552-19.993 32.519-38.348 35.745-18.911 3.78-39.638-2.09-52.981-16.241-5.603-5.726-10.248-12.422-13.501-19.749 0.01-9.582 4.394-19.111 12.42-24.568 11.76-8.271 26.587-11.524 40.78-11.752zm0-3.99c-15.898 0.273-32.519 4.08-45.161 14.162-8.156 6.446-12.473 17.084-11.874 27.311 8.877 20.205 27.771 36.687 50.122 39.327 17.496 2.52 36.588-2.53 48.733-15.842 6.35-6.776 11.16-15.032 13.82-23.938 0.14-11.151-4.87-22.497-14.41-28.654-11.892-8.534-26.711-12.355-41.23-12.366z"
        />
        <path
          fill="#fcd4b5"
          d="m116.29 68.99c-0.37 9.889-9.81 15.951-17.969 19.509-19.228 7.753-41.149 8.135-61.003 2.556-9.296-2.974-19.629-7.492-23.982-16.865-3.6173-8.184 2.482-16.512 9.275-20.637 16.162-9.983 36.171-11.602 54.675-9.555 12.749 1.8555 26.612 5.4245 35.397 15.526 2.1448 2.6731 3.6295 5.9904 3.6067 9.466z"
        />
        <clipPath id="a">
          <use overflow="visible" />
        </clipPath>
        <g fill="#b89278" clipPath="url(#a)">
          <path d="m28.03 92.46c-4.594-1.9809-0.87766-8.9036 0.85922-12.065 3.8691-5.3677 10.33-10.407 17.274-9.4638 3.8735 6.0817-8.4784 3.712-10.681 8.5686-5.242 2.877-3.428 10.546-7.452 12.96z" />
          <path d="m23.52 90.02c-5.435-2.381-4.116-10.335-1.85-14.701 1.623-3.956 8.471-12.065 11.96-6.479-3.112 3.556-9.255 6.573-9.383 12.841-1.416 2.976 4.398 7.243-0.727 8.339z" />
          <path d="m14.14 81.93c-6.5444-3.2362-1.4612-12.061 2.4239-15.757 1.4908-2.8594 4.4505-6.1015 8.6043-5.6562 3.9081 4.2129-5.1881 5.3557-6.0949 9.6315-3.9 2.901-3.223 7.306-3.273 11.042l-0.77 0.554-0.89 0.186z" />
          <path d="m44.99 73.63c-7.058-1.106-16.12-0.894-20.476-7.663-1.805-3.997-6.568-13.948-0.054-15.087 2.6903 3.9895 0.60163 11.765 6.0155 14.921 4.2421 4.5462 15.798-0.13321 16.462 6.6566-0.371 0.707-1.147 1.179-1.948 1.172z" />
          <path d="m38.77 64.59c-5.704-1.251-11.754-5.578-11.42-12.068-2.118-3.975 4.364-11.556 5.225-4.664-3.918 6.959 3.433 11.287 8.401 13.773 0.552 1.44-0.716 3.008-2.206 2.959z" />
          <path d="m37.45 72.31c-5.896-2.933 5.197-9.875 0.344-14.974-0.781-5.403-11.854-6.653-8.519-11.978 5.0093 0.2102 9.2108 5.0375 11.98 9.1116 3.542 5.308 1.7 12.667-2.235 17.22l-0.74 0.464-0.83 0.156z" />
          <path d="m45.17 75.14c-5.5481-2.7579 3.7395-8.7019 1.174-13.751 0.50483-7.0086-4.8148-12.625-10.938-15.07-4.8388-2.9448 1.1675-6.7486 3.8892-3.0483 6.4628 3.1947 11.479 9.5956 11.417 17.019 0.418 5.203-0.378 12.368-5.542 14.85z" />
          <path d="m55.33 58.76c-4.466-2.207-0.379-11.076-7.22-12.45-3.914-0.142-8.527-6.324-2.045-5.924 5.7514 2.2204 11.95 6.4428 11.407 13.442 0.06309 1.7945 0.57026 4.8848-2.1419 4.9317z" />
          <path d="m33.68 95.48c-5.9678-4.0437 4.6791-11.018 8.6654-13.231 2.8512-2.777 9.3922 0.20994 4.6121 3.3202-5.2668 0.88637-9.3429 5.1832-12.015 9.5175l-0.599 0.291-0.664 0.102z" />
          <path d="m68.33 97.55c-5.746-2.036 3.915-7.642-1.415-11.226-3.518-0.585-8.016-6.312-1.768-6.008 7.233 1.441 10.886 12.1 4.513 16.784l-0.642 0.338-0.688 0.112z" />
          <path d="m77.18 98.3c-5.113-2.829 2.003-11.093-2.421-15.717-1.716-2.509-10.135-7.137-2.979-8.163 8.646 3.084 10.351 13.954 7.737 21.72-0.206 1.132-1.109 2.191-2.337 2.16z" />
          <path d="m85.09 97.55c-5.62-2.334 3.761-8.59-0.753-12.936-1.109-5.362-8.756-9.042-7.587-14.224 6.523-0.731 9.678 9.645 12.498 14.653 1.379 4.169 0.214 10.695-4.158 12.507z" />
          <path d="m100.01 90.74c-3.649-0.687-5.177-5.135-8.55-6.86-3.381-0.354-12.328-2.208-6.563-6.019 3.679 1.323 8.535 0.733 11.213 4.159 1.8358 1.7529 6.672 4.6463 4.9015 7.5375-0.33384 0.39417-0.66767 0.78834-1.0015 1.1825z" />
          <path d="m106.02 88.33c-3.8557-3.028-6.3247-8.8872-11.94-10.51-3.3873-2.7882-13.776 1.7496-11.861-4.9525 3.5629-1.4068 7.8879-0.52084 11.618 0.17189 5.2547 1.7385 9.9938 5.3255 13.151 9.8431 0.87994 1.9061 2.5305 5.0843-0.9675 5.4475z" />
          <path d="m110.7 82.67c-3.8077-3.5679-7.5522-9.9103-14.37-8.89-3.0292 0.57191-11.631 0.95878-7.1567-3.8781 7.9032-1.6798 17.456-0.27216 22.26 6.9381 1.3881 1.683 2.6094 5.5464-0.73375 5.83z" />
          <path d="m105.17 68.43c-3.31 0.447-14.383-1.054-8.852-5.604 6.702 1.372 14.292 2.301 20.472-1.466 5.9751-0.66358 1.8939 5.9573-2.0043 5.7829-3.0594 1.2622-6.3675 1.2799-9.6157 1.2871z" />
          <path d="m104.49 74.63c-6.54-0.3318-2.1022-6.8288 2.4154-4.4928 4.9837 0.79019 9.8637-1.8272 14.25-2.0742 3.0538 5.5975-6.9576 6.2801-10.838 6.4474-1.9413 0.0904-3.885 0.05531-5.8269 0.11959z" />
        </g>
        <path
          fill="#f79329"
          d="m65.41 67.1c-3.4344 4.0103-13.127 7.3102-13.629-0.65346 0.08929-5.675 3.1578-10.852 5.6477-15.815 3.7092-6.5422 11.803-12.655 19.476-8.9632 5.9395 2.6189 5.4294 10.585 1.1166 14.42-3.873 4.021-8.409 7.351-12.612 11.011z"
        />
        <path
          fill="#855c52"
          d="m56.44 73.73c-6.5077 0.08158-8.2571-8.1465-5.95-13.05 3.211-8.9615 8.1088-19.283 18.141-21.892 7.1053-2.3348 16.389 3.4194 14.895 11.431-1.738 8.2557-10.04 12.364-15.685 17.738-3.217 2.769-6.979 5.622-11.401 5.773zm15.76-30.95c-8.7165 0.4084-13.57 9.0542-16.332 16.315-2.5443 3.5104-3.1158 12.93 3.5444 9.3655 5.9641-3.481 10.903-8.5015 16.143-12.962 5.57-4.17 4.442-12.826-3.355-12.718z"
        />
        <path
          fill="#f79329"
          d="m78.13 67.66c-4.016 3.4323-14.108 5.1622-13.352-2.7789 0.98551-5.5862 4.8232-10.217 8.0656-14.722 4.6828-5.8891 13.644-10.655 20.643-5.8063 5.4627 3.5174 3.7009 11.302-1.16 14.413-4.463 3.36-9.466 5.94-14.197 8.894z"
        />
        <path
          fill="#855c52"
          d="m69.56 72.9c-6.499 0.367-8.614-7.74-5.88-12.536 4.677-8.911 11.225-19.082 22.199-20.18 7.34-1.127 15.531 5.999 12.791 13.64-3.023 7.891-11.883 10.642-18.312 15.071-3.259 2.04-6.873 3.896-10.798 4.005zm17.48-28.32c-9.1432 0.39974-14.544 9.0775-18.59 16.23-4.6088 5.5112 1.8314 10.317 6.7806 5.9362 5.977-3.926 12.997-6.646 17.933-11.952 4.182-4.612-0.765-10.653-6.124-10.214z"
        />
        <path
          fill="#f79329"
          d="m86.04 73.89c-4.6463 2.508-14.878 2.0822-12.474-5.5217 2.1242-5.2648 6.8662-8.9755 10.978-12.705 5.8175-4.7677 15.576-7.5363 21.397-1.3262 4.5906 4.5844 1.2325 11.823-4.1644 13.845-5.069 2.344-10.501 3.81-15.74 5.708z"
        />
        <path
          fill="#855c52"
          d="m79.11 77.46c-6.4081 0.91684-10.176-6.5412-6.9354-11.634 3.3846-5.3771 8.1745-9.9485 13.386-13.565 6.7264-4.8132 17.847-5.7246 22.975 1.8464 4.3442 5.79 0.27219 13.718-5.8768 16.118-6.7727 2.773-13.726 5.3336-20.848 7.0245-0.894 0.133-1.797 0.21-2.701 0.21zm17.96-24.52c-8.8737 0.48941-15.298 7.695-20.543 14.12-4.4867 7.8697 7.2404 6.374 11.199 3.8959 5.819-2.4613 13.079-3.0559 17.272-8.2519 3.27-5.117-2.96-10.295-7.93-9.764z"
        />
        <path
          fill="#fff"
          d="m42.99 84.56c-1.2566-10.759 9.7061-21.332 20.441-18.104 6.3159 1.3235 9.2741 8.8237 6.5845 14.442-3.369 7.336-12.299 11.301-20.109 10.391-3.461-0.501-6.756-3.002-6.917-6.729z"
        />
        <path
          fill="#fcc21b"
          d="m62.03 82.86c-5.63 1.704-12.891-4.856-8.647-10.285 3.563-4.786 13.394-3.808 13.596 3.044 0.262 3.166-1.699 6.572-4.949 7.241z"
        />
        <path
          fill="#40c0e7"
          d="m50.14 3.41c-0.67526-6.8914-8.9135 1.3633-9.86 4.96-3.0102 5.7619-1.5882 12.808 2.333 17.767 4.4137 3.0138-1.0282 10.939 3.6105 11.863 6.4886-3.6277 5.5278-12.19 2.6289-17.903-2.391-5.445-1.799-11.666 1.288-16.687z"
        />
        <path
          fill="#40c0e7"
          d="m84.28 3.41c-0.66989-6.8878-8.921 1.3528-9.85 4.96-3.0158 5.7575-1.5982 12.811 2.3254 17.767 4.4114 3.0073-1.0183 10.933 3.6105 11.863 6.4855-3.6307 5.5253-12.19 2.6264-17.903-2.391-5.445-1.799-11.666 1.288-16.687z"
        />
        <path
          fill="#40c0e7"
          d="m66.46 3.41c-0.66604-6.8898-8.9154 1.3558-9.85 4.96-3.0176 5.7562-1.614 12.814 2.3198 17.767 4.4034 3.0116-1.0119 10.934 3.6179 11.863 6.48-3.635 5.529-12.189 2.629-17.903-2.409-5.449-1.784-11.657 1.283-16.687z"
        />
        <path
          fill="#ed6c30"
          d="m116.37 68.62c-0.0667 9.6464-9.128 15.798-17.017 19.392-19.075 8.072-40.974 8.567-60.857 3.287-9.672-2.949-20.51-7.477-25.06-17.195-2.38-4.603-0.495-13.769-0.413-16.336-1.764 2.544-3.5287 5.088-5.293 7.632-1.5667 17.542 9.2133 33.906 23.303 43.469 3.9375 4.4979 13.224 3.8232 13.457 10.381 4.0991 6.8365 13.056 7.6301 20.232 8.1639 7.4414-0.16678 16.344-0.79388 21.395-6.9875 1.4478-4.096 1.264-7.8134 6.3588-8.9402 15.255-8.8277 27.352-24.801 27.974-42.856-1.3568-0.0063-2.7399 0.01289-4.08-0.01z"
        />
      </svg>
      <div className={styles.pulse}><div></div><div></div></div>
    </div>
  );
}

export default PulsingRamen;
