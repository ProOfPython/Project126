HEIGHT = 400
WIDTH = 500

wristPos = [0, 0, 0, 0]
scores = [0, 0]

song1 = ''
song2 = ''
songStats = [false, false]

function preload(){song1 = loadSound('music1.mp3'); song2 = loadSound('music2.mp3')}
function modelLoaded(){console.log('Model Intact')}

function setup(){
    canvas = createCanvas(WIDTH, HEIGHT)
    canvas.center()
    
    video = createCapture(VIDEO)
    video.hide()
    
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function gotPoses(results){
    if (results.length > 0){
        /* console.log(results) */
        wristPos[0] = results[0].pose.leftWrist.x
        wristPos[1] = results[0].pose.leftWrist.y 
        wristPos[2] = results[0].pose.rightWrist.x
        wristPos[3] = results[0].pose.rightWrist.y
        
        scores[0] = results[0].pose.keypoints[9].score
        scores[1] = results[0].pose.keypoints[10].score
    }
}

function draw(){
    image(video, 0, 0, WIDTH, HEIGHT)

    stroke('#ff00ff')
    fill('#ff00ff')

    songStats[0] = song1.isPlaying()
    songStats[1] = song2.isPlaying()

    if (scores[0] > 0.2){
        circle(wristPos[0], wristPos[1], 10)
        /* document.getElementById('songName').innerHTML = 'Song Type: Mysterious' */
        song2.stop()
        if (songStats[0] == false){
            song1.play()
        }
    }
    if (scores[1] > 0.2){
        circle(wristPos[2], wristPos[3], 10)
        /* document.getElementById('songName').innerHTML = 'Song Type: Chill' */
        song1.stop()
        if (songStats[1] == false){
            song2.play()
        }
    }
}