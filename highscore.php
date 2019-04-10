<html>
    <head>  
        <meta charset="utf-8" />
        <title>High Score Boys</title>
        
        <p>High Scores</p>
    </head>

    <body>
      
    <?php
        $con=mysqli_connect("localhost","root","","robofish");
        // Check connection
        if (mysqli_connect_errno())
          {
          echo "Failed to connect to MySQL: " . mysqli_connect_error();
          }

        $sql = "SELECT userid, userscore, bullets, enemies FROM score_tbl";
        $result = mysqli_query($con, $sql);
        
        if (mysqli_num_rows($result)>0){
            while($row = mysqli_fetch_assoc($result)){
                echo "Player: " .$row["userid"]."///". "Score: " .$row["userscore"]."///". "Bullets: " .$row["bullets"]."///". "Enemies: " .$row["enemies"]."///"."<br>";
            }
        }
        else {
            echo "0 results";
        }
        mysqli_close($con);
        ?>
        
        <div id="gameDiv"></div>
    </body>  
</html> 