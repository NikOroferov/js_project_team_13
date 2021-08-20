"use strict"
import { refs } from './getRefs';

//Parallax
export default
window.onload = function () {
    const content = document.querySelector('.parallax-container');
        const screen = document.querySelector('.images-parallax__screen');
        const hall = document.querySelector('.images-parallax__hall');
        const sittings = document.querySelector('.images-parallax__sittings');

    if (refs.parallax) {
        

        const forScreen = 40;
        const forHall = 38;
        const forSittings = 20;

        const speed = 0.05;

        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            screen.style.cssText = `transform: translate(${positionX / forScreen}%,${positionY / forScreen}%);`;
            hall.style.cssText = `transform: translate(${positionX / forHall}%,${positionY / forHall}%);`;
            sittings.style.cssText = `transform: translate(${positionX / forSittings}%,${positionY / forSittings}%);`;
        
            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        refs.parallax.addEventListener("mousemove", moveMouse);
            
        function moveMouse(e) {
                const parallaxWidth = refs.parallax.offsetWidth;
                const parallaxHeight = refs.parallax.offsetHeight;
           

            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            coordXprocent = coordX / parallaxWidth * 100;
                coordYprocent = coordY / parallaxHeight * 100;
        };
        
        
    }
    }

