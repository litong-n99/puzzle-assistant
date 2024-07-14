import cv from "@techstark/opencv-js";

export default (bigImg, pieceImg, canvas, knnDistance_option) => {
    if (!bigImg || !pieceImg) {
        alert('plz upload images')
        return;
    }

    const im2 = cv.imread(bigImg);
    const im1 = cv.imread(pieceImg);

    const im1Gray = new cv.Mat();
    const im2Gray = new cv.Mat();
    cv.cvtColor(im1, im1Gray, cv.COLOR_BGRA2GRAY);
    cv.cvtColor(im2, im2Gray, cv.COLOR_BGRA2GRAY);

    const keypoints1 = new cv.KeyPointVector();
    const keypoints2 = new cv.KeyPointVector();
    const descriptors1 = new cv.Mat();
    const descriptors2 = new cv.Mat();

    const orb = new cv.AKAZE();

    orb.detectAndCompute(im1Gray, new cv.Mat(), keypoints1, descriptors1);
    orb.detectAndCompute(im2Gray, new cv.Mat(), keypoints2, descriptors2);

    let good_matches = new cv.DMatchVector();
    let bf = new cv.BFMatcher();
    let matches = new cv.DMatchVectorVector();

    bf.knnMatch(descriptors1, descriptors2, matches, 2);

    let counter = 0;
    for (let i = 0; i < matches.size(); ++i) {
        let match = matches.get(i);
        let dMatch1 = match.get(0);
        let dMatch2 = match.get(1);
        //console.log("[", i, "] ", "dMatch1: ", dMatch1, "dMatch2: ", dMatch2);
        if (dMatch1.distance <= dMatch2.distance * parseFloat(knnDistance_option)) {
            //console.log("***Good Match***", "dMatch1.distance: ", dMatch1.distance, "was less than or = to: ", "dMatch2.distance * parseFloat(knnDistance_option)", dMatch2.distance * parseFloat(knnDistance_option), "dMatch2.distance: ", dMatch2.distance, "knnDistance", knnDistance_option);
            good_matches.push_back(dMatch1);
            counter++;
        }
    }

    let imMatches = new cv.Mat();
    let color = new cv.Scalar(0,255,0, 255);
    cv.drawMatches(im1, keypoints1, im2, keypoints2, 
                    good_matches, imMatches, color);
    cv.imshow(canvas, imMatches);
}