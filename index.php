<?php
try {
	$pdo = new PDO('mysql:host=127.0.0.1;dbname=quizage;charset=utf8','quizage','quizage',
	array(PDO::ATTR_EMULATE_PREPARES => false));
	$stmt = $pdo->query('SELECT * FROM users');

	$users = array();
	$order = 1;
	while($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
		$user = array();
		$user['id'] = $row['id'];
		$user['name'] = $row['name'];
		$users[$order] = $user;
		$order++;
	}
} catch (PDOException $e) {
 exit('データベース接続失敗。'.$e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>quizAge</title>
    <link rel="stylesheet" href="dist/css/bootstrap.css">
    <link rel="stylesheet" href="dist/css/flat-ui.css">
    <link rel="stylesheet" href="style.css">
    <script src="jquery-2.1.1.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div class="header">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <a class="navbar-brand" href="#">quizAge</a>
            </div>
          </div><!-- /.container-fluid -->
        </nav>
    </div>
    <div class="main">
        <div class="container">
        <form action="answer.php" method="post">

            <div class="quiz-content">
                <h3>左から年齢が高い順に並べ替えて下さい♪</h3>
                <div class="menu">
                    <ul>
                    	<?php
                    		foreach ($users as $order => $user) {
                    	?>
                        	<li>
                        		<div draggable="true">
                        			<img src="img/<?php echo $user['name']; ?>.jpg" order="<?php echo $order; ?>" userId="<?php echo $user['id']; ?>" class="<?php echo $user['name']; ?>" height="160" width="160">
                        		</div>
                        	</li>
                        <?php
                        }
                        ?>
                        <input type="hidden" class="answer-users" name="user" value='<?php echo json_encode($users); ?>'>
                    </ul>
                </div>
            </div>
            <div class="quiz-result"></div>
            <div class="quiz-answer">
                <h2>正解</h2>
                <p class="quiz-answer-content"></p>
            </div>
            <button class="btn btn-primary next-button">回答を見る</button>
        </form>
        </div>
    </div>
	<div class="footer">
      <div class="container">
        <div class="row">
          <div class="col-xs-7">
          </div> <!-- /col-xs-7 -->
        </div>
      </div>
    </div>
    </body>
</html>
