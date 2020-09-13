---
layout: post
type: "MECSEAIML"
subject: "IA"
section: "Unit 1: Introduction and Image Enhancement"
title:  "2. Digital Image Fundamentals"
author: Jitender Singh Virk
---


In 1666, Sir Isaac Newton discovered that when a beam of sunlight passes through a glass prism, the emerging beam of light is not white but consists instead of a continuous spectrum of colors ranging from violet at one end to red at the other. As the Figure 2.10 shows, the range of colors we perceive in visible light is a small portion of the electromagnetic spectrum. On one end of the spectrum are radio waves with wavelengths billions of times longer than those of visible light. On the other end of the spectrum are gamma rays with wavelengths millions of times smaller than those of visible light.

<img src="/assets/20MAI/IA/spectrum.png" class="rounded mx-auto d-block" alt="spectrum" style="max-width: 97%; max-height:40rem;">

The electromagnetic spectrum can be expressed in terms of wavelength, frequency, or energy. Wavelength ($$\lambda$$) and frequency ($$\nu$$) are related by the expression

$$\lambda = \frac{c}{\nu}$$

Where $$c$$ is the speed of light ( 2.998 × 10 m/s). Figure 2.11 shows a schematic representation of one wavelength.

<img src="/assets/20MAI/IA/wavelength.png" class="rounded mx-auto d-block" alt="wavelength" style="max-width: 97%; max-height:20rem;">

The energy of the various components of the electromagnetic spectrum is given by the expression

$$E = h\nu$$

where $$h$$ is Planck’s constant. The units of wavelength are meters, with the terms *microns* (denoted m and equal to 10 <sup> -- 6 </sup> m) and nanometers (denoted nm and equal to 10 <sup> -- 9 </sup> m) being used just as frequently. Frequency is measured in Hertz (Hz), with one Hz being equal to one cycle of a sinusoidal wave per second. A commonly used unit of energy is the electron-volt.

Electromagnetic waves can be visualized as propagating sinusoidal waves with wavelength (Fig. 2.11 ), or they can be thought of as a stream of massless particles, each traveling in a wavelike pattern and moving at the speed of light. Each massless particle contains a certain amount (or bundle) of energy, called a *photon*. We see from Eq. $$E = h\nu$$ that energy is proportional to frequency, so the higher-frequency (shorter wavelength) electromagnetic phenomena carry more energy per photon. Thus, radio waves have photons with low energies, microwaves have more energy than radio waves, infrared still more, then visible, ultraviolet, X-rays, and finally gamma rays, the most energetic of all. High-energy electromagnetic radiation, especially in the X-ray and gamma ray bands, is particularly harmful to living organisms.

Light is a type of electromagnetic radiation that can be sensed by the eye. The visible (color) spectrum is shown expanded in Fig. 2.10 for the purpose of discussion. The visible band of the electromagnetic spectrum spans the range from approximately 0.43 $$\mu$$m (violet) to about 0.79 $$\mu$$m (red). For convenience, the color spectrum is divided into six broad regions: violet, blue, green, yellow, orange, and red. No color (or other component of the electromagnetic spectrum) ends abruptly; rather, each range blends smoothly into the next, as Fig. 2.10 shows.

Light that is void of color is called *monochromatic (or achromatic)* light. The only attribute of monochromatic light is its intensity. Because the intensity of monochromatic light is perceived to vary from black to grays and finally to white, the term *gray level* is used commonly to denote monochromatic intensity (we use the terms *intensity* and *gray level* interchangeably in subsequent discussions). The range of values of monochromatic light from black to white is usually called the *gray scale*, and monochromatic images are frequently referred to as *grayscale images*.

Chromatic (color) light spans the electromagnetic energy spectrum from approximately 0.43 to 0.79 $$\mu$$m, as noted previously. In addition to frequency, three other quantities are used to describe a chromatic light source: radiance, luminance, and brightness. *Radiance* is the total amount of energy that flows from the light source, and it is usually measured in watts (W). *Luminance*, measured in lumens (lm), gives a measure of the amount of energy an observer perceives from a light source. *Brightness* is a subjective descriptor of light perception that is practically impossible to measure. It embodies the achromatic notion of intensity and is one of the key factors in describing color sensation.

Although imaging is based predominantly on energy from electromagnetic wave radiation, this is not the only method for generating images. For example, the sound reflected from objects can be used to form ultrasonic images. Other sources of digital images are electron beams for electron microscopy, and software for generating synthetic images used in graphics and visualization.

## Image Sensing and Acquisition
Image sensing is performed by a sensor when it gets illuminated by reflected or transmitted energy from an energy source like an object or an image under consideration. Depending on the nature of the source, illumination energy is reflected from, or transmitted through, objects. An example in the first category is light reflected from a planar surface. An example in the second category is when X-rays pass through a patient’s body for the purpose of generating a diagnostic X-ray image. In some applications, the reflected or transmitted energy is focused onto a photo converter (e.g., a phosphor screen) that converts the energy into visible light. Electron microscopy and some applications of gamma imaging use this approach.

#### Image Acquisition Using a Single Sensing Element

<img src="/assets/20MAI/IA/imgacq.png" class="rounded mx-auto d-block" alt="single imaging sensor" style="max-width: 97%; max-height:50rem;">

Figure 2.12(a) shows the components of a single sensing element. A familiar sensor of this type is the photodiode, which is constructed of silicon materials and whose output is a voltage proportional to light intensity. Using a filter in front of a sensor improves its selectivity. For example, an optical green-transmission filter favors light in the green band of the color spectrum. As a consequence, the sensor output would be stronger for green light than for other visible light components.

<img src="/assets/20MAI/IA/acq_sis.png" class="rounded mx-auto d-block" alt="single imaging sensor" style="max-width: 97%; max-height:25rem;">

In order to generate a 2-D image using a single sensing element, there has to be relative displacements in both the x- and y-directions between the sensor and the area to be imaged. Figure 2.13 shows an arrangement used in high-precision scanning, where a film negative is mounted onto a drum whose mechanical rotation provides displacement in one dimension. The sensor is mounted on a lead screw that provides motion in the perpendicular direction. A light source is contained inside the drum. As the light passes through the film, its intensity is modified by the film density before it is captured by the sensor. This “modulation” of the light intensity causes corresponding variations in the sensor voltage, which are ultimately converted to image intensity levels by digitization.

This method is an inexpensive way to obtain high-resolution images because mechanical motion can be controlled with high precision. The main disadvantages of this method are that it is slow and not readily portable. Other similar mechanical arrangements use a flat imaging bed, with the sensor moving in two linear directions. These types of mechanical digitizers sometimes are referred to as *transmission microdensitometers*. Systems in which light is reflected from the medium, instead of passing through it, are called *reflection microdensitometers*. Another example of imaging with a single sensing element places a laser source coincident with the sensor. Moving mirrors are used to control the outgoing beam in a scanning pattern and to direct the reflected laser signal onto the sensor.

#### Image Acquisition Using Sensor Strips
<img src="/assets/20MAI/IA/acq_strip.png" class="rounded mx-auto d-block" alt="single imaging sensor" style="max-width: 97%; max-height:40rem;">

A geometry used more frequently than single sensors is an in-line sensor strip, as in Fig. 2.12(b) . The strip provides imaging elements in one direction. Motion perpendicular to the strip provides imaging in the other direction, as shown in Fig. 2.14(a) . This arrangement is used in most flat bed scanners. Sensing devices with 4000 or more in-line sensors are possible. In-line sensors are used routinely in airborne imaging applications, in which the imaging system is mounted on an aircraft that flies at a constant altitude and speed over the geographical area to be imaged. One-dimensional imaging sensor strips that respond to various bands of the electromagnetic spectrum are mounted perpendicular to the direction of flight. An imaging strip gives one line of an image at a time, and the motion of the strip relative to the scene completes the other dimension of a 2-D image. Lenses or other focusing schemes are used to project the area to be scanned onto the sensors.

Sensor strips in a ring configuration are used in medical and industrial imaging to obtain cross sectional (“slice”) images of 3-D objects, as Fig. 2.14(b) shows. A rotating X-ray source provides illumination, and X-ray sensitive sensors opposite the source collect the energy that passes through the object. This is the basis for medical and industrial computerized axial tomography (CAT) imaging. The output of the sensors is processed by reconstruction algorithms whose objective is to transform the sensed data into meaningful cross-sectional images. In other words, images are not obtained directly from the sensors by motion alone; they also require extensive computer processing. A 3-D digital volume consisting of stacked images is generated as the object is moved in a direction perpendicular to the sensor ring. Other modalities of imaging based on the CAT principle include magnetic resonance imaging (MRI) and positron emission tomography (PET). The illumination sources, sensors, and types of images are different, but conceptually their applications are very similar to the basic imaging approach shown in Fig. 2.14(b).

#### Image Acquisition Using Sensor Arrays
<img src="/assets/20MAI/IA/acq_array.png" class="rounded mx-auto d-block" alt="single imaging sensor" style="max-width: 97%; max-height:45rem;">

Figure 2.12(c) shows individual sensing elements arranged in the form of a 2-D array. Electromagnetic and ultrasonic sensing devices frequently are arranged in this manner. This is also the predominant arrangement found in digital cameras. A typical sensor for these cameras is a CCD (charge-coupled device) array, which can be manufactured with a broad range of sensing properties and can be packaged in rugged arrays of 4000 × 4000 elements or more. CCD sensors are used widely in digital cameras and other light-sensing instruments. The response of each sensor is proportional to the integral of the light energy projected onto the surface of the sensor, a property that is used in astronomical and other applications requiring low noise images. Noise reduction is achieved by letting the sensor integrate the input light signal over minutes or even hours. Because the sensor array in Fig. 2.12(c) is two-dimensional, its key advantage is that a complete image can be obtained by focusing the energy pattern onto the surface of the array. Motion obviously is not necessary, as is the case with the sensor arrangements discussed in the preceding two sections.

Figure 2.15 shows the principal manner in which array sensors are used. This figure shows the energy from an illumination source being reflected from a scene (as mentioned at the beginning of this section, the energy also could be transmitted through the scene). The first function performed by the imaging system in Fig. 2.15(c) is to collect the incoming energy and focus it onto an image plane. If the illumination is light, the front end of the imaging system is an optical lens that projects the viewed scene onto the focal plane of the lens, as Fig. 2.15(d) shows. The sensor array, which is coincident with the focal plane, produces outputs proportional to the integral of the light received at each sensor. Digital and analog circuitry sweep these outputs and convert them to an analog signal, which is then digitized by another section of the imaging system. The output is a digital image, as shown diagrammatically in Fig. 2.15(e)

## Image Sampling and Quantization
The output of most sensors is a continuous voltage waveform whose amplitude and spatial behavior are related to the physical phenomenon being sensed. To create a digital image, we need to convert the continuous sensed data into a digital format. This requires two processes: sampling and quantization.

#### Sampling and Quantization

<img src="/assets/20MAI/IA/img_sq.png" class="rounded mx-auto d-block" alt="single imaging sensor" style="max-width: 97%; max-height:45rem;">

Figure 2.16(a) shows a continuous image f that we want to convert to digital form. An image may be continuous with respect to the x- and y-coordinates, and also in amplitude. To digitize it, we have to sample the function in both coordinates and also in amplitude. Digitizing the coordinate values is called *sampling*. Digitizing the amplitude values is called *quantization*.

The one-dimensional function in Fig. 2.16(b) is a plot of amplitude (intensity level) values of the continuous image along the line segment AB in Fig. 2.16(a) . The random variations are due to image noise. To sample this function, we take equally spaced samples along line AB, as shown in Fig. 2.16(c) . The samples are shown as small dark squares superimposed on the function, and their (discrete) spatial locations are indicated by corresponding tick marks in the bottom of the figure. The set of dark squares constitute the sampled function. However, the values of the samples still span (vertically) a continuous range of intensity values. In order to form a digital function, the intensity values also must be converted (quantized) into discrete quantities. The vertical gray bar in Fig. 2.16(c) depicts the intensity scale divided into eight discrete intervals, ranging from black to white. The vertical tick marks indicate the specific value assigned to each of the eight intensity intervals. The continuous intensity levels are quantized by assigning one of the eight values to each sample, depending on the vertical proximity of a sample to a vertical tick mark. The digital samples resulting from both sampling and quantization are shown as white squares in Fig. 2.16(d) . Starting at the top of the continuous image and carrying out this procedure downward, line by line, produces a two dimensional digital image. It is implied in Fig. 2.16 that, in addition to the number of discrete levels used, the accuracy achieved in quantization is highly dependent on the noise content of the sampled signal.

In practice, the method of sampling is determined by the sensor arrangement used to generate the image. When an image is generated by a single sensing element combined with mechanical motion, as in Fig. 2.13 , the output of the sensor is quantized in the manner described above. However, spatial sampling is accomplished by selecting the number of individual mechanical increments at which we activate the sensor to collect data. Mechanical motion can be very exact so, in principle, there is almost no limit on how fine we can sample an image using this approach. In practice, limits on sampling accuracy are determined by other factors, such as the quality of the optical components used in the system.

Clearly, the quality of a digital image is determined to a large degree by the number of samples and discrete gray levels used in sampling and quantization.

#### Digital Image Representation
<img src="/assets/20MAI/IA/img_rep.png" class="rounded mx-auto d-block" alt="Image as an array" style="max-width: 97%; max-height:12rem;">

The continuous image is sampled into a digital image, say f(x,y), containing M rows and N columns where (x,y) are discrete coordinates. The most common representation of digital images is in the form of array (matrix) that comprises of numerical values of f(x,y) as shown in the image above. This representation is used for computer processing.

<img src="/assets/20MAI/IA/img_cord.png" class="rounded mx-auto d-block" alt="Coordinates convention" style="max-width: 97%; max-height:35rem;">

The right side of this equation is a digital image represented as an array of real numbers. Each element of this array is called an image element, picture element, pixel, or pel. Figure 2.19 shows a graphical representation of an image array, where the x- and y-axis are used to denote the rows and columns of the array. Specific pixels are values of the array at a fixed pair of coordinates. We generally use f(i, j) when referring to a pixel with coordinates (i, j). The section of the real plane spanned by the coordinates of an image is called the *spatial domain*, with x and y being referred to as *spatial variables* or *spatial coordinates*.

As Fig. 2.19 shows, we define the origin of an image at the top left corner. This is a convention based on the fact that many image displays (e.g., TV monitors) sweep an image starting at the top left and moving to the right, one row at a time. More important is the fact that the first element of a matrix is by convention at the top left of the array. Choosing the origin of f(x, y) at that point makes sense mathematically because digital images in reality are matrices. In fact, as you will see, sometimes we use x and y interchangeably in equations with the rows (r) and columns (c) of a matrix.

It is important to note that the representation in Fig. 2.19 , in which the positive x-axis extends downward and the positive y-axis extends to the right, is precisely the right-handed Cartesian coordinate system with which you are familiar, but shown rotated by 90° so that the origin appears on the top, left.

To express sampling and quantization in more formal mathematical terms, let Z and R denote the set of integers and the set of real numbers, respectively. The sampling process may be viewed as partitioning the xy-plane into a grid, with the coordinates of the center of each cell in the grid being a pair of elements from the Cartesian product $$Z^2$$ (also denoted Z × Z) which, as you may recall, is the set of all ordered pairs of elements ($$Z_i, Z_j$$) with $$Z_i$$ and $$Z_j$$ being integers from set Z. Hence, f(x, y) is a digital image if (x, y) are integers from $$Z^2$$ and *f* is a function that assigns an intensity value (that is, a real number from the set of real numbers, R) to each distinct pair of coordinates (x, y). This functional assignment is the quantization process described earlier. If the intensity levels also are integers, then R = Z, and a digital image becomes a 2-D function whose coordinates and amplitude values are integers.

Image digitization requires that decisions be made regarding the values for M, N, and for the number, L, of discrete intensity levels. There are no restrictions placed on M and N, other than they have to be positive integers. However, digital storage and quantizing hardware considerations usually lead to the number of intensity levels, L, being an integer power of two; that is $$L = 2^k$$ where k is an integer. We assume that the discrete levels are equally spaced and that they are integers in the range [0, L − 1].

**Some useful terms**:
* we define the **dynamic range** of an imaging system to be the ratio of the maximum measurable intensity to the minimum detectable intensity level in the system. As a rule, the upper limit is determined by *saturation* and the lower limit by *noise*, although noise can be present also in lighter intensities.
* **Saturation** is the highest value beyond which all intensity values are clipped.
* The **dynamic range** establishes the lowest and highest intensity levels that a system can represent and, consequently, that an image can have. Closely associated with this concept is **image contrast**, which we define as the difference in intensity between the highest and lowest intensity levels in an image. The **contrast ratio** is the ratio of these two quantities.
* When an appreciable number of pixels in an image have a high dynamic range, we can expect the image to have high contrast. Conversely, an image with low dynamic range typically has a dull, washed-out gray look.
* The number, b, of bits required to store a digital image is $$ b = M \times N \times k$$, When $$M = N$$, this equation becomes $$b = N^2k$$. When an image can have 2 possible intensity levels, it is common practice to refer to it as a “k-bit image,” (e,g., a 256-level image is called an 8-bit image). Note that storage requirements for large 8 bit images (e.g., 10, 000 × 10, 000 pixels) are not insignificant.

#### Spatial and Intensity Resolution
Resolution is a measure of the amount of detail in an image. In a bitmap image the resolution depends on the pixel density, the number of pixels per unit (not the total number of pixels in the image). The resolution depth of a screen image is usually measured in pixels per inch (PPI). A high resolution image can be magnified and still stay sharp. A low resolution image will appear pixelated (the individual pixels will be clearly visible) if it is magnified to the same size as a high resolution image. An image with a high resolution will have a greater the file size than the equivalent low resolution image because more memory is used to store the color data of the extra pixels.

Intuitively, *spatial resolution* is a measure of the smallest discernible detail in an image. Quantitatively, spatial resolution can be stated in several ways, with line pairs per unit distance, and dots (pixels) per unit distance being common measures. A widely used definition of image resolution is the largest number of discernible line pairs per unit distance (e.g., 100 line pairs per mm). Dots per unit distance is a measure of image resolution used in the printing and publishing industry. In the U.S., this measure usually is expressed as dots per inch (dpi). To give you an idea of quality, newspapers are printed with a resolution of 75 dpi, magazines at 133 dpi, glossy brochures at 175 dpi, and the book page at which you are presently looking was printed at 2400 dpi.

To be meaningful, measures of spatial resolution must be stated with respect to spatial units. Image size by itself does not tell the complete story. For example, to say that an image has a resolution of 1024 × 1024 pixels is not a meaningful statement without stating the spatial dimensions encompassed by the image. Size by itself is helpful only in making comparisons between imaging capabilities. For instance, a digital camera with a 20-megapixel CCD imaging chip can be expected to have a higher capability to resolve detail than an 8-megapixel camera, assuming that both cameras are equipped with comparable lenses and the comparison images are taken at the same distance.


*Intensity resolution* similarly refers to the smallest discernible change in intensity level. We have considerable discretion regarding the number of spatial samples (pixels) used to generate a digital image, but this is not true regarding the number of intensity levels. Based on hardware considerations, the number of intensity levels usually is an integer power of two, as we discussed with $$L = 2^k$$. The most common number is 8 bits, with 16 bits being used in some applications in which enhancement of specific intensity ranges is necessary. Intensity quantization using 32 bits is rare. Sometimes one finds systems that can digitize the intensity levels of an image using 10 or 12 bits, but these are not as common.

*Unlike spatial resolution, which must be based on a per-unit-of-distance basis to be meaningful, it is common practice to refer to the number of bits used to quantize intensity as the **intensity resolution***. For example, it is common to say that an image whose intensity is quantized into 256 levels has 8 bits of intensity resolution. However, keep in mind that discernible changes in intensity are influenced also by noise and saturation values, and by the capabilities of human perception to analyze and interpret details in the context of an entire scene. The following two examples illustrate the effects of spatial and intensity resolution on discernible detail.

***EXAMPLE: Effects of reducing the spatial resolution of a digital image***
<div class="row">
  <div class="col">
    <img src="/assets/20MAI/IA/example_spatial.png" class="rounded mx-auto d-block" alt="Example of spatial resolution" style="max-width: 97%; min-width: 50%; max-height:45rem;">
  </div>
  <div class="col-lg">
    Figure 2.23 shows the effects of reducing the spatial resolution of an image. The images in Figs. 2.23(a) through (d) have resolutions of 930, 300, 150, and 72 dpi, respectively. Naturally, the lower resolution images are smaller than the original image in (a). For example, the original image is of size 2136 × 2140 pixels, but the 72 dpi image is an array of only 165 × 166 pixels. In order to facilitate comparisons, all the smaller images were zoomed back to the original size (the method used for zooming will be discussed later in this section). This is somewhat equivalent to “getting closer” to the smaller images so that we can make comparable statements about visible details.
  </div>
</div>
<br>

***EXAMPLE: Effects of varying the number of intensity levels in a digital image***
<div class="row">
  <div class="col">
    <img src="/assets/20MAI/IA/example_intensity.png" class="rounded mx-auto d-block" alt="Example of spatial resolution" style="max-width: 97%; min-width: 50%; max-height:45rem;">
  </div>
  <div class="col-lg">
  Figure 2.24 is a 256-level grayscale image of a chemotherapy vial (bottom) and a drip bottle. The objective of this example is to reduce the number of intensities of this image from 16 to 2 in integer powers of 2, while leaving the image resolution at a fixed 783 dpi (the images are of size 2022 × 1800 pixels). These structures are clearly visible in the 16-level image in Fig. 2.24(e). This effect, caused by using an insufficient number of intensity levels in smooth areas of a digital image, is called *false contouring*, so named because the ridges resemble topographic contours in a map. False contouring generally is quite objectionable in images displayed using 16 or fewer uniformly spaced intensity levels, as the images in Figs. 2.24(e) -(h)
show.
  </div>
</div>
<br>

#### Image Interpolation
Interpolation is used in tasks such as zooming, shrinking, rotating, and geometrically correcting digital images. *Interpolation* is the process of using known data to estimate values at unknown locations.

Suppose that an image of size 500 × 500 pixels has to be enlarged 1.5 times to 750 × 750 pixels. A simple way to visualize zooming is to create an imaginary 750 × 750 grid with the same pixel spacing as the original image, then shrink it so that it exactly overlays the original image. Obviously, the pixel spacing in the shrunken 750 × 750 grid will be less than the pixel spacing in the original image. To assign an intensity value to any point in the overlay, we look for its closest pixel in the underlying original image and assign the intensity of that pixel to the new pixel in the 750 × 750 grid. When intensities have been assigned to all the points in the overlay grid, we expand it back to the specified size to obtain the resized image.

The method just discussed is called **nearest neighbor interpolation** because it assigns to each new location the intensity of its nearest neighbor in the original image. This approach is simple but, it has the tendency to produce undesirable artifacts, such as severe distortion of straight edges. A more suitable approach is **bilinear interpolation**, in which we use the four nearest neighbors to estimate the intensity at a given location. Let (x, y) denote the coordinates of the location to which we want to assign an intensity value (think of it as a point of the grid described previously), and let $$v(x, y)$$ denote that intensity value. For bilinear interpolation, the assigned value is obtained using the equation $$v(x, y) = ax + by + cxy + d$$. Where the four coefficients are determined from the four equations in four unknowns that can be written using the four nearest neighbors of point (x, y). Bilinear interpolation gives much better results than nearest neighbor interpolation, with a modest increase in computational burden.

**Note**: *Contrary to what the name suggests, bilinear interpolation is not a linear operation because it involves multiplication of coordinates (which is not a linear operation).*

The next level of complexity is **bicubic interpolation**, which involves the sixteen nearest neighbors of a point. The intensity value assigned to point (x, y) is obtained using the equation

$$v(x, y) = \sum_{i = 0}^{3} \sum_{j = 0}^{3} a_ijx^iy^j$$

The sixteen coefficients are determined from the sixteen equations with sixteen unknowns that can be written using the sixteen nearest neighbors of point (x, y). Observe that above equation reduces in form to $$v(x, y) = ax + by + cxy + d$$ if the limits of both summations in the former equation are 0 to 1. Generally, bicubic interpolation does a better job of preserving fine detail than its bilinear counterpart. Bicubic interpolation is the standard used in commercial image editing applications, such as Adobe Photoshop and Corel Photopaint.

Although images are displayed with integer coordinates, it is possible during processing to work with subpixel accuracy by increasing the size of the image using interpolation to “fill the gaps” between pixels in the original image.

It is possible to use more neighbors in interpolation, and there are more complex techniques, such as using splines or wavelets, that in some instances can yield better results than the methods just discussed. While preserving fine detail is an exceptionally important consideration in image generation for 3-D graphics (for example, see [Hughes and Andries [2013]](https://ptgmedia.pearsoncmg.com/images/9780321399526/samplepages/0321399528.pdf)), the extra computational burden seldom is justifiable for general-purpose digital image processing, where bilinear or bicubic interpolation typically are the methods of choice.

## Relationships Between Pixels
following are several important relationships between pixels in a digital image. When referring in the following discussion to particular pixels, we use lowercase letters, such as *p* and *q*.

#### Neighbors of a Pixel
A pixel *p* at coordinates (x, y) has two horizontal and two vertical neighbors with coordinates

$$(x + 1, y), (x − 1, y), (x , y + 1), (x , y − 1)$$

This set of pixels, called the **4-neighbors** of *p*, is denoted $$N_4(p)$$. The four diagonal neighbors of *p* have coordinates

$$(x + 1, y + 1), (x + 1, y − 1), (x − 1, y + 1), (x − 1, y − 1)$$

and are denoted $$N_D(p)$$. These neighbors, together with the 4-neighbors, are called the **8-neighbors** of *p*, denoted by $$N_8(p)$$. The set of image locations of the neighbors of a point *p* is called the *neighborhood of p*. The neighborhood is said to be *closed* if it contains *p*. Otherwise, the neighborhood is said to be *open*.

#### Adjacency, Connectivity, Regions, and Boundaries






---
## FAQs <small><small>(hover on green text for answer)</small></small>
* the higher-frequency (shorter wavelength) electromagnetic phenomena carry __blank__ (more/less) energy per photon. <span class="text-success" data-toggle="tooltip" data-placement="right" title="more"> answer </span>
* In the continuous to digital image conversion, the process of digitizing the amplitude values is called __blank__. <span class="text-success" data-toggle="tooltip" data-placement="right" title="Quantization"> answer </span>
* The process used for digitizing the coordinate values in the conversion of continuous image to digital image is: <span class="text-success" data-toggle="tooltip" data-placement="right" title="Sampling"> answer </span>
  1. Quantization
  2. Digitization
  3. Acquisition
  4. Sampling
* __blank__ sampling is accomplished by selecting the number of individual mechanical increments at which we activate the sensor to collect data. <span class="text-success" data-toggle="tooltip" data-placement="right" title="Spatial"> answer </span>
* The insufficient number of intensity levels used to represent a smooth area in a digital image causes <span class="text-success" data-toggle="tooltip" data-placement="right" title="False Contouring"> answer </span>
  1. Sampling
  2. Thinning
  3. False Contouring
  4. Interpolation




---
##### References
* Book: Digital Image Processing, Rafael C. Gonzalez and Richard E. Woods, 4th edition, Chapter 2.

* [Comparison of different Interpolation techniques](https://download.atlantis-press.com/article/4822.pdf)
