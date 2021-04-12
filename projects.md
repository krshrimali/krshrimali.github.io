---
layout: page
permalink: /projects/
---

**Note**: This page might be outdated, please check out my <a href="krshrimali.github.io/resume.pdf">Resume</a> if you want to know more about my projects, or you can check my <a href="http://github.com/krshrimali/">GitHub profile</a> and my <a href="http://github.com/BuffetCodes">GitHub organization</a> as well.

Deep Learning PyTorch Tutorials
====================

<img src="https://raw.githubusercontent.com/krshrimali/krshrimali.github.io/master/assets/pytorch.jpg" width="250">

[PyTorch Tutorials](https://github.com/krshrimali/Deep-Learning-Libraries/tree/master/PyTorch/Chapters) - This GitHub repo contains PyTorch Tutorials and Notes from the book: https://www.packtpub.com/big-data-and-business-intelligence/deep-learning-pytorch. Highly suggest reading this book to get a good head start in PyTorch. The following topis are covered:

- **Basics of PyTorch:** Tensors, Data Loading etc.
- **Convolutional Neural Networks**
- **Visualizing Outputs from Hidden Layers**
and more.

Computer Vision Projects
===================

<img src="/assets/opencv.png" width="250">

1. **Dimensionality-Calculation-using-Homography-Matrix-and-QR-Code-Detection** (C++ and Python)
    - OpenCV based dimensional measurement of a book cover using Homography and Ratio comparison.
    - **What it does?**: Approximation of the dimensions of a cover page of a book using techniques: Homography Algorithms, (QR Code Detection using Zbar). 
    - **How it does?**: QR Code generation using any online web service. [Example: https://www.qr-code-generator.com/]
       * Detection of the QR Code and Text generation [encoded in the QR code - assuming text or any hyperlink etc.] using zbar module in Python. Credits: learnopencv.com
       * Printing out the QR Code on a page, assuming it to be on a book - take the snap of it, and determine the approximate dimensions of the book cover, using the measured (manually) dimensions of the QR code.
       * Note: The QR Code detection has been shown in qr_code_detection.py file, although in the book dimension code - a text has been assumed instead of QR code because of some unavailability of the printing facilities. The version for QR code will be out soon.
       * Homography technique is used, feature detection, choosing the image of the QR code as the selected area.
    - **Link**: https://github.com/krshrimali/Dimensionality-Calculation-using-Homography-Matrix-and-QR-Code-Detection
2. [**Implementation of No Reference Image Quality Assessment using BRISQUE**](https://github.com/krshrimali/No-Reference-Image-Quality-Assessment-using-BRISQUE-Model) (C++ and Python)

    - <img src="https://raw.githubusercontent.com/krshrimali/No-Reference-Image-Quality-Assessment-using-BRISQUE-Model/master/Images/Table_Comparison_BRISQUE.png"/>
    - Implementation of NR IQA Method (BRISQUE) in OpenCV using C++ and Python. The project uses LIBSVM and OpenCV libraries. NumPy is used for vectorization.
3. [**Template Matching, Cartoonification and more**](https://github.com/krshrimali/OpenCV_Work/blob/master/Cartoonifier_Report.pdf) (C++ and Python)

    - <img src="/assets/blog/cartoonified.PNG"/>
    - Implementation of several OpenCV Algorithms like Template Matching and Cartoonification. [Code](https://github.com/krshrimali/OpenCV_Work) available on my GitHub.
4. [**Deep Learning based Edge Detection**](https://github.com/krshrimali/Deep-Learning-based-Edge-Detection) (Python)

    - <img src="https://raw.githubusercontent.com/krshrimali/Deep-Learning-based-Edge-Detection/master/testdata/comparison/output_flowers.png" height="400"/>
    - Deep Learning based Edge Detection using OpenCV's HED Implementation.
5. **Flask based Web App using OpenCV** (Python)

    - Implementation of OpenCV's Thresholding and Grayscaling on Realtime webcam interface using Flask and OpenCV. Code to be released soon.
6. [**Panorama Image Stitching using OpenCV**](https://github.com/krshrimali/Panorama-Image-Stitching-using-OpenCV) (Python and C++)

    - Panorama of two images using OpenCV.

Blogs
====================
1. [**PyTorch C++ API: Using PyTorch C++ API using VGG-16 Network on MNIST Dataset**](https://krshrimali.github.io/PyTorch-C++-API/)
2. [**Custom Data Loading using PyTorch C++ API**](https://krshrimali.github.io/Custom-Data-Loading-Using-PyTorch-CPP-API/)
3. [**Training a Network on Custom Dataset using PyTorch C++ API**](https://krshrimali.github.io/Training-Network-Using-Custom-Dataset-PyTorch-CPP/)
4. [**Classifying Dogs vs Cats using PyTorch C++ API: Part-1**](https://krshrimali.github.io/Blog-Dogs-VS-Cats/)
5. [**Classifying Dogs vs Cats using PyTorch C++: Part 2**](https://krshrimali.github.io/Classifying-Dogs-Cats-PyTorch-CPP-Part-2/)
6. [**Applying Transfer Learning on Dogs vs Cats Dataset (ResNet18) using PyTorch C++ API**](https://krshrimali.github.io/Applying-Transfer-Learning-Dogs-Cats/)
7. [**What's so special about Gaussian Distribution?**](https://krshrimali.github.io/Understanding-Gaussian-Distribution/)

Guest Blogs
====================
1. [**Convex Hull using Python and C++**](https://www.learnopencv.com/convex-hull-using-opencv-in-python-and-c/):
    - In this post, I explain how to find the Convex Hull of a shape (a group of points). I also explained the algorithm and then follow up with C++ and Python code implementation using OpenCV.
2. [**SVM using Scikit-Learn in Python**](https://www.learnopencv.com/svm-using-scikit-learn-in-python/):
    - This post explains the implementation of Support Vector Machines (SVMs) using Scikit-Learn library in Python.
3. [**Average Faces of FIFA World Cup 2018**](https://www.learnopencv.com/average-faces-of-fifa-world-cup-2018/):
    - <img src="https://www.learnopencv.com/wp-content/uploads/2018/06/fifa-players-with-country-names.png"/>
4. [**Image Quality Assessment using BRISQUE**](https://www.learnopencv.com/image-quality-assessment-brisque/):
    - <img src="https://www.learnopencv.com/wp-content/uploads/2018/06/workflow-brisque-iqa.png"/>
