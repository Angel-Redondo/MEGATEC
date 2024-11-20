$(document).ready(function () {

    const imagenes = [
        { src: "fotos/pcgaming1.jpg", alt: "Imagen 1" },
        { src: "fotos/pcgaming2.jpg", alt: "Imagen 2" },
        { src: "fotos/pcoficina3.jpg", alt: "Imagen 3" },
        { src: "fotos/pcoficina4.jpg", alt: "Imagen 4" },
    ];

    const galleryContainer = $(".gallery-container");


    imagenes.forEach((img) => {
        const galleryItem = $(`
            <div class="gallery-item">
                <img src="${img.src}" alt="${img.alt}" class="gallery-img">
            </div>
        `);
        galleryContainer.append(galleryItem);
    });

    const lightbox = $("#lightbox");
    const lightboxImg = $("#lightbox-img");


    $(".gallery").on("click", ".gallery-img", function () {
        const imgSrc = $(this).attr("src");
        lightboxImg.attr("src", imgSrc);
        lightbox.fadeIn();  
    });

 
    lightbox.on("click", function (e) {
        if (e.target !== lightboxImg[0]) {
            lightbox.fadeOut(); 
        }
    });
});
