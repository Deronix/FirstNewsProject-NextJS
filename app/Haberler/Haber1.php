<?php
// Database connection
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch news data
$sql = "SELECT * FROM haberproje";
$result = $conn->query($sql);
?>
<style>
    .haber-container {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 2rem;
    height: 100%;
    width: 100%;
    transition: all 0.5s ease;
    cursor: pointer;
    overflow: hidden;
  }
  
  .mainImage {
    width: 100%;
    max-height: 40vh;
    object-fit: cover;
    border-radius: 2vh;
    transition: transform 0.3s ease;
  }
  
  .mainTitle {
    font-size: 2.5rem;
    margin: 0;
    color: var(--text-primary);
  }
  
  .content {
    display: grid;
    gap: 2rem;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.5s ease;
  }
  
  .expanded .content {
    max-height: 1000px;
    opacity: 1;
    overflow: visible;
  }
  
  .imageRow {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 1rem 0;
  }
  
  .subImage {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 1vh;
  }
  
  .sections {
    display: grid;
    gap: 2rem;
  }
  
  .section h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
  }
  
  .section p {
    line-height: 1.6;
    margin: 0;
  }
  
  .notes {
    font-style: italic;
    opacity: 0.8;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1vh;
  }
  
  .sponsorBox {
    padding: 2rem;
    background: var(--bg-secondary);
    border-radius: 2vh;
    text-align: center;
  }
  
  .sponsorBox h3 {
    margin: 0 0 1rem 0;
  }
  
  .readMore {
    display: inline-block;
    padding: 1rem 2rem;
    background: var(--accent);
    color: white;
    text-decoration: none;
    border-radius: 2vh;
    transition: transform 0.3s ease;
  }
  
  .readMore:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    .mainTitle {
      font-size: 1.8rem;
    }
    
    .imageRow {
      grid-template-columns: 1fr;
    }
    
    .subImage {
      height: 150px;
    }
  } 
</style>
<?php if ($result->num_rows > 0): ?>
    <?php while($haber = $result->fetch_assoc()): ?>
        <div class="haber-container" onclick="toggleHaber(this)">
            <img src="<?= htmlspecialchars($haber['resim1']) ?>" class="main-image">
            <h1 class="main-title"><?= htmlspecialchars($haber['ana_baslik']) ?></h1>
            
            <div class="content">
                <p class="summary"><?= htmlspecialchars($haber['kisa_tanitim']) ?></p>
                
                <div class="image-row">
                    <?php if($haber['resim2']): ?>
                        <img src="<?= htmlspecialchars($haber['resim2']) ?>" class="sub-image">
                    <?php endif; ?>
                    <?php if($haber['resim3']): ?>
                        <img src="<?= htmlspecialchars($haber['resim3']) ?>" class="sub-image">
                    <?php endif; ?>
                </div>

                <div class="sections">
                    <div class="section">
                        <?php if($haber['baslik1']): ?>
                            <h2><?= htmlspecialchars($haber['baslik1']) ?></h2>
                            <p><?= htmlspecialchars($haber['paragraf1']) ?></p>
                        <?php endif; ?>
                    </div>
                    <div class="section">
                        <?php if($haber['baslik2']): ?>
                            <h2><?= htmlspecialchars($haber['baslik2']) ?></h2>
                            <p><?= htmlspecialchars($haber['paragraf2']) ?></p>
                        <?php endif; ?>
                    </div>
                    <div class="section">
                        <?php if($haber['baslik3']): ?>
                            <h2><?= htmlspecialchars($haber['baslik3']) ?></h2>
                            <p><?= htmlspecialchars($haber['paragraf3']) ?></p>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="notes">
                    <?php if($haber['not1']): ?>
                        <p><?= htmlspecialchars($haber['not1']) ?></p>
                    <?php endif; ?>
                    <?php if($haber['not2']): ?>
                        <p><?= htmlspecialchars($haber['not2']) ?></p>
                    <?php endif; ?>
                </div>

                <div class="sponsor-box">
                    <h3><?= htmlspecialchars($haber['sponsor_baslik']) ?></h3>
                    <p><?= htmlspecialchars($haber['sponsor_icerik']) ?></p>
                    <a href="<?= htmlspecialchars($haber['sponsor_link']) ?>" target="_blank">
                        Sponsor Websitesi
                    </a>
                </div>

                <a href="<?= htmlspecialchars($haber['link']) ?>" class="read-more" target="_blank">
                    Devamını Oku
                </a>
            </div>
        </div>
    <?php endwhile; ?>
<?php else: ?>
    <p>No news found</p>
<?php endif; ?>

<?php $conn->close(); ?>

<script>
function toggleHaber(element) {
    element.classList.toggle('expanded');
}
</script>