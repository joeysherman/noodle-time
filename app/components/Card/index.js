/**
 *
 * Card
 *
 */

import React from 'react';
import Rating from '../Rating';

function Card(props) {
  let {
    name,
    display_phone,
    distance,
    is_closed,
    categories,
    image_url,
    rating,
    review_count,
  } = props.place;

  let { detail } = props;
  let { loading } = props;

  return (
    <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg m-auto p-4">
      <div className="relative pb-2/3 md: pb-1/5">
        <img className="absolute h-full w-full object-cover" src={image_url} />
      </div>
      <h1 className="font-bold text-4xl mb-1">{name}</h1>
      <div className="w-full">
        <div className="flex flex-col h-full justify-around">
          <div className="flex mb-2">
            <Rating rating={rating} className="pb-2" />
            <p className="pl-3">{review_count} reviews.</p>
          </div>
          <h2
            className={
              is_closed
                ? 'inline-block mr-2 font-semibold text-red-600 pb-2'
                : 'font-semibold text-green-600 pb-2'
            }
          >
            {loading ? 'loading' : 'done'}
          </h2>
          <div className="flex mb-2">
            {categories.length &&
              categories.map(function(val, index) {
                return (
                  <p
                    className="bg-blue-400 px-2 py-1 mr-2 rounded-full w font-light text-xs"
                    key={index}
                  >
                    {val.title}
                  </p>
                );
              })}
          </div>

          <div className="flex w-full justify-around p-4">
            <button className="w-full inline-flex flex-col items-center justify-center rounded shadow-md text-gray-900 leading-normal font-bold py-3 px-5 mr-2">
              <img
                className="inline-block mr-2"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAADR0lEQVRYhe2Xz2tcVRTHP+e9WUzepG1Kg4v8QLsrLkSEuinFjRt/bMQOpYhgmZknWkuThQvBxfM/KAykyZvBBEUDDqILNQV10+hCIWo3dqFIoZkQi5AyJtdJ+t47LjITL5M3Y6MzgtDvZu79nnPe9zv33nfnjNBnKMhWsfgCIr7AYwCquoLjzOXCcFFA7Xzpq3g+724dPfqeqJ7tYm4xd+fOi1KrxW3O6acBc+TIm93EAQTOmZGRNzq4/kCnp4fM5uZtYLhFbQrMICKq+kqbF/h96O7dB2RhoQmQuZeHm/PnJzWTKQIvsbtqHzmqtezExNcSBAlA05iTljgCBa9S+QDAlErfKSwCKBxqZjIngeWeBjSfd83hw0/jOL7CU4BrhS8mIhdNvb6m+fxxqdV2EtVDdr0DP7THURx/77p/lSewl7vPQMP3R114zagWgIkUb2vAWGs81jx2bAy4GUfRz7ZIBK8qTAMY171gP8B13Z/a431nYKtUug48kiIMgDc+7jZXV08lInngeRV5fTgM3wcwpdINhRNW+s3W50MWdyNXqTzcnqRtQVdxgNaeLwPLGgRTm+vro1Z4FrhszW3h3XqRGXt+T4fwb8zcbs+HstlZ02xeAo6nF8gvQxsboU319R6QcnlbVV+m47ZrQ0UuSK22MzADAMPV6udAmBKaHZ6bu9pJ9t0AgJfNXgK+tahvvGx2Ki13IAakXN6WKDoD/IrquqiekXJ5+z8xYIrFswDe/PwtVJ8BnvWq1VU7NlADKrJgCoVTALlqdSVXra4AmELhcRV5e+AGgKw6zscN39+7kBq+f0Id51PA60z+V/dAD4y6ql80ff8JjeMoUb0KjKYlDsoAwHis+iWOA/Bgt6RBGugp3MZAXsOD4P9n4I9i8bQGQd+MH/gMJCLXTL3+mymVljRJat7k5JIEQfRPDaQ1JKm/ZD2wBnzY7hFNvR73yL2eq1QetYmDLGVT4F2g3BJtY4zdHvGaqddvdaldReStWOTJzkDaFkQd/I8C4U4m887IlSsbABoEU3ZbhtUjWnUxsESShF6j8Zn9Z8TG/i0oFmcQOScinwjMDYXhV12+FS0zjmXmOSABFiSKqt78fLcVuY/72MOfC0Q3AtCc5dYAAAAASUVORK5CYII="
              />
              Directions
            </button>
            <a
              href={`tel:${display_phone}`}
              className="w-full inline-flex flex-col items-center justify-center transition duration-300 ease-in-out bg-red-500 hover:opacity-75 rounded shadow-md text-white leading-normal font-bold py-3 px-5"
            >
              <img
                className="inline-block mr-2"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACFklEQVRYhe3WO2gVQRQG4C+JRqPRgA+wEDWoxChB7QTRUsHKIlhoZaMES7HQNHaWEqzEQlAUBQtFBd8QLLSwMUIaJeILXyBIxFdirsWc5W4Sb9Dcu8EiP2yx/5k5/78zZ+Ys0/iP0YyzGMRDrJ9K8SbcQyn3fMLGqRCfjZsh+gYduBbv77CmSPGGnNhbtAU/CzdyplYVZeBoiLzH2jGxJtyJ+AssLcLAxxDYVCE+F70x5nKtxevwLZK3TDBuc4x5VWsDcDuSd1WId+BDjOkpwsCuSP5YWpFK4lfQWISBRmlpS+jM8fVS9ZdwtSjxDPtDqF86lhnOBH+6SHGYiWchdiDHt+MXhrGuaBM7w8AgWnP8ieAfSZdToTgXYneVC3IeBoK/KNVGYVgoXccldOf4dqkxlXAJc/4wtwsPwuSyakzskPZ9BLtz/JaciSfYkIsdM7qLPseKakx0R6Lv2JrjV6IvYsM4iePxPoS9uF8LE3U4pfxPkO8TTdIX/1T+4iHlO6S5ViYacCESfZG2Jo82nJdWqXNMbKyJ5dWYyFZiGIeNPwXzK8zNm+idrAHSdhyRCrMUSVf/5dxWaat+GN9n/hnb8TpMfMUhE/eHxcoFe71a8QwtUuWPROKX2IcZE4j3Y0mtDGTYJt0F2SkYwEEskv4dM/G+MFMI6rEHT42+hLKnUPE8GqRGdkuqjc/SyVkwFeLTmBR+AzfGm+5rBiJBAAAAAElFTkSuQmCC"
              />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
