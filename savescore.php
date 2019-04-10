<?php
$con=mysqli_connect("localhost","root","","robofish");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

if (isset($_POST['json'])) {
        // use json_decode() transform to array
        $request_json = json_decode($_POST['json'], true);
        $theuser = $request_json['user'];
		$thescore = $request_json['thescore'];
        //new
        $thebullets = $request_json['thebullets'];
        $theenemies = $request_json['theenemies'];
		//echo "This is a message from PHP. The user:".$theuser." have stored his score : ".$thescore;
        
		//$sql="INSERT INTO score_tbl (userid,userscore) VALUES ('".$theuser."',".$thescore.")";
        //new
        $sql="INSERT INTO score_tbl (userid,userscore,bullets,enemies) VALUES ('".$theuser."','".$thescore."','".$thebullets."','".$theenemies."')";
		mysqli_query($con,$sql);
		mysqli_close($con);
}
?>