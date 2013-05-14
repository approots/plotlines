<!DOCTYPE html>
<html>
<head>
    <title>Plotlines Read</title>

</head>
<body>
Test message:
<?php echo $test; ?>
<br/>
Stories:
<br/>
<?php foreach($stories as $story): ?>
<a href="read/story/<?=$story['id'];?>"><?=$story['title'];?></a>
<?php endforeach; ?>

</body>
</html>