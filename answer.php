<?php
	$post_users = json_decode($_POST['user'], true);

	$post_ids = array();
	foreach ($post_users as $order => $user) {
		// var_dump($user);
		$post_ids[$order - 1] = $user['id'];
	}

	$pdo = new PDO('mysql:host=127.0.0.1;dbname=quizage;charset=utf8','quizage','quizage',
	array(PDO::ATTR_EMULATE_PREPARES => false));
	$stmt = $pdo->query('SELECT * FROM users where id in(' . implode(',', $post_ids) . ') order by age desc');

	$db_users = array();
	while($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
		$user = array();
		$db_users[] = $row['id'];
	}
	if ($post_ids == $db_users) {
		echo 'true';
	} else {
		echo 'false';
	}
