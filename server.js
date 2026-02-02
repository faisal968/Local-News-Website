const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure database directory exists
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('Created database directory');
}

// Database setup
const dbPath = path.join(dbDir, 'news.db');
console.log('Database path:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database:', dbPath);
    initializeDatabase();
  }
});

// Initialize database with sample data
function initializeDatabase() {
  // Create articles table
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT,
      date TEXT NOT NULL
    )
  `;

  db.run(createTableSQL, (err) => {
    if (err) {
      console.error('❌ Error creating table:', err.message);
    } else {
      console.log('✅ Articles table ready');
      // Insert sample data
      insertSampleData();
    }
  });
}

function insertSampleData() {
  const sampleArticles = [
    {
      title: "New Community Center Opens Downtown",
      category: "Local",
      content: `The new downtown community center officially opened its doors today, offering various programs for residents of all ages. Mayor Johnson cut the ribbon at the opening ceremony, emphasizing the city's commitment to community development.

The $15 million facility features a state-of-the-art library with over 50,000 books, digital learning labs, and quiet study areas. Library director Sarah Chen expressed excitement about the new resources available to the public. "We've designed this space to be inclusive and accessible to everyone," she said during the tour.

The fitness center includes a swimming pool, basketball courts, weight training areas, and yoga studios. Fitness coordinator Mark Thompson highlighted the variety of classes available, from beginner sessions to advanced training. "Our goal is to promote healthy living for all age groups," Thompson explained.

Multiple meeting rooms equipped with modern technology will be available for community events, workshops, and local organization meetings. The center also features a commercial kitchen for cooking classes and community meals. Community engagement director Lisa Rodriguez stated, "This center will be the heart of our neighborhood, bringing people together."

Future plans include after-school programs for children, senior citizen activities, job training workshops, and cultural events celebrating the city's diversity. The center will operate seven days a week, with extended hours to accommodate working families. Residents can sign up for memberships starting next Monday, with discounted rates for students and seniors.`,
      image_url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop",
      date: "2024-01-15"
    },
    {
      title: "High School Football Team Wins State Championship",
      category: "Sports",
      content: `The Lincoln High School Lions clinched the state championship with a stunning last-minute touchdown that will be remembered for years to come. Quarterback Mike Johnson threw a miraculous 40-yard pass to receiver Alex Smith in the final seconds, securing a dramatic 28-27 victory over their long-time rivals, the Central High Tigers.

The game was a back-and-forth battle from start to finish, with both teams displaying exceptional skill and determination. The Lions trailed by 6 points with only 45 seconds remaining on the clock. Coach Williams called a timeout and designed what would become the play of the season. "We practiced this exact scenario all year," Coach Williams said in the post-game interview. "These boys never gave up, and their hard work paid off."

Quarterback Mike Johnson, a senior in his final high school game, completed 22 of 30 passes for 285 yards and three touchdowns. "This moment is everything we've worked for since freshman year," Johnson said, holding back tears of joy. "I knew Alex would be there. We've been connecting on that route since middle school."

Receiver Alex Smith, who made the championship-winning catch, described the moment: "When I saw the ball in the air, everything slowed down. I knew I had to make that catch for my team, for our school, for our community." Smith finished the game with 8 receptions for 125 yards and two touchdowns.

The team returned to a hero's welcome at Lincoln High, where hundreds of fans cheered their historic win. The school announced a victory parade through downtown scheduled for Saturday morning. This championship marks the first state title for Lincoln High in 15 years, cementing this team's legacy in school history.`,
      image_url: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&auto=format&fit=crop",
      date: "2024-01-14"
    },
    {
      title: "City Council Approves Record $2.3 Billion Budget",
      category: "Politics",
      content: `In a historic unanimous decision, the city council approved the largest budget in the city's history - a $2.3 billion plan for the upcoming fiscal year. The vote, which took place after weeks of deliberation and public hearings, signals a major investment in the city's future.

The budget allocates $500 million for critical infrastructure improvements, including road repairs, bridge maintenance, and public transportation upgrades. "Our infrastructure has been neglected for too long," said Council Member Rodriguez. "These investments will create jobs while making our city safer and more efficient."

Public safety receives $300 million, funding for 50 new police officers, updated equipment for fire departments, and expanded emergency medical services. The funding will also establish a new community policing initiative designed to strengthen relationships between law enforcement and neighborhoods. Police Chief Miller expressed gratitude, stating, "This investment will help us better serve and protect our community."

Education funding increases by 15% with $200 million allocated to public schools. This includes teacher salary increases, technology upgrades for classrooms, and expanded vocational training programs. School Superintendent Dr. Thompson remarked, "This is a game-changer for our students. We can now provide the resources our children deserve."

The budget also includes innovative tax incentives for small businesses affected by recent economic challenges. Small business owners can apply for grants and low-interest loans starting next month. Additionally, $75 million is earmarked for affordable housing initiatives and $50 million for renewable energy projects.

Mayor Johnson called the budget "a balanced approach that addresses immediate needs while planning for long-term growth." The fiscal year begins July 1, with implementation of new programs starting immediately after approval.`,
      image_url: "https://images.unsplash.com/photo-1575320181282-9afab400332f?w=800&auto=format&fit=crop",
      date: "2024-01-13"
    },
    {
      title: "Local Theater Announces Innovative Shakespeare Festival",
      category: "Entertainment",
      content: `The Globe Theater's annual Shakespeare Festival promises to be the most innovative yet, Artistic Director Sarah Williams announced at a press conference this morning. This year's theme, 'Shakespeare Reimagined,' will feature contemporary adaptations of classic plays set in modern contexts with diverse casting choices.

The festival opens next Friday with a production of "Romeo and Juliet" set in rival tech companies in Silicon Valley. Director Michael Chen explained his vision: "By placing these timeless characters in a modern corporate setting, we explore how love and conflict transcend centuries." The production features original electronic music and innovative stage design using projection mapping.

"Macbeth" receives a political thriller treatment, exploring themes of ambition and power in a modern government setting. Lead actress Maria Gonzalez, playing Lady Macbeth, shared her approach: "We're examining how ambition manifests in today's world. The themes are surprisingly relevant to contemporary politics and corporate culture."

New this year is "The Tempest" reimagined as a science fiction narrative set on a distant planet. The production utilizes cutting-edge special effects and virtual reality elements that allow audience members to experience the magical island through VR headsets during intermission.

The festival also includes workshops, lectures, and family-friendly matinee performances. Local schools will participate in educational programs, with discounted tickets for students. "We want to make Shakespeare accessible to everyone," Williams emphasized. "These plays are living, breathing works that speak to every generation."

Tickets are already selling at record pace, with opening night completely sold out. The festival runs for four weeks, with performances Wednesday through Sunday. A special gala fundraiser will be held on the final Saturday, with proceeds supporting theater education programs for underprivileged youth.`,
      image_url: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&auto=format&fit=crop",
      date: "2024-01-12"
    },
    {
      title: "Major Infrastructure Project: Main Street Reconstruction",
      category: "Local",
      content: `Starting Monday, Main Street between 5th and 8th Avenues will undergo a comprehensive six-week reconstruction project that represents the largest infrastructure investment in the downtown area in decades. The $4.5 million initiative will replace century-old water pipes and completely resurface the roadway.

City Engineer Robert Chen outlined the project scope: "We're not just fixing potholes. We're rebuilding the entire underground infrastructure while creating a more pedestrian-friendly surface." The project includes replacing 2,000 feet of water mains dating back to 1920, installing new storm drainage systems, and upgrading street lighting to energy-efficient LED fixtures.

The reconstruction will occur in three carefully planned phases to minimize disruption. Phase one (weeks 1-2) focuses on the eastern section, phase two (weeks 3-4) addresses the central corridor, and phase three (weeks 5-6) completes the western segment. Traffic engineers have designed detailed detour routes that will be clearly marked with digital signage.

Local businesses have expressed both concern and optimism about the project. "Short-term pain for long-term gain," said restaurant owner Lisa Martinez. "We're prepared with delivery specials and promotions to maintain business during construction." The city has established a Small Business Support Fund offering grants to affected establishments.

Pedestrian improvements include wider sidewalks, new crosswalks with countdown timers, and accessibility upgrades compliant with ADA standards. The project also incorporates green infrastructure with rain gardens and permeable pavement to manage stormwater runoff sustainably.

Commuters are advised to allow 20-30 minutes of extra travel time during construction hours (7 AM to 7 PM, Monday through Saturday). Real-time updates will be available through the city's mobile app and website. Project completion is scheduled for March 15, with a community celebration planned for the grand reopening.`,
      image_url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop",
      date: "2024-01-11"
    },
    {
      title: "Annual Basketball Tournament Breaks Attendance Records",
      category: "Sports",
      content: `The 25th Annual City Basketball Tournament concluded this weekend with unprecedented success, attracting over 10,000 spectators and breaking all previous attendance records. The event, held at the Downtown Sports Arena, featured 32 teams competing across five divisions over three action-packed days.

The championship game delivered an instant classic as local favorites 'The Hawks' defeated arch-rivals 'The Eagles' 98-95 in a thrilling overtime finale. Hawks captain Jamal Williams scored the game-winning three-pointer with only 1.2 seconds remaining. "This is what we live for," Williams said, still catching his breath after the game. "The energy from the crowd pushed us through those final minutes."

Tournament director Maria Rodriguez praised the community spirit: "We've never seen this level of engagement. The stands were packed from the opening tip-off to the final buzzer." She attributed the success to expanded marketing efforts, family-friendly activities between games, and partnerships with local schools and community organizations.

New this year was the Youth Development Program, featuring skills clinics for children ages 8-14 conducted by former professional players. Over 500 young athletes participated in the free clinics, learning fundamentals from experienced coaches. "Investing in youth sports creates healthier communities," said clinic coordinator Coach Thompson.

The economic impact was substantial, with local hotels reporting 95% occupancy and restaurants seeing a 40% increase in weekend business. "This tournament has become a major economic driver for our city," noted Economic Development Director Chen. Preliminary estimates suggest the event generated over $2 million in local spending.

Plans are already underway for next year's tournament, with organizers announcing a 50% expansion of the venue to accommodate growing interest. Registration for next year's competition opens in September, with early bird discounts available for teams that sign up before November 1.`,
      image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop",
      date: "2024-01-10"
    },
    {
      title: "Mayor Unveils 'Green Future 2030' Environmental Plan",
      category: "Politics",
      content: `Mayor Johnson today unveiled 'Green Future 2030,' an ambitious and comprehensive environmental initiative aimed at reducing the city's carbon emissions by 50% over the next decade. The plan represents the most significant environmental commitment in the city's history and positions it as a national leader in sustainability.

The cornerstone of the initiative is a groundbreaking solar energy program offering 100% subsidies for residential solar panel installation for qualifying homeowners. "We're making renewable energy accessible to every resident," announced Environmental Director Dr. Sarah Chen. "Our goal is to have solar panels on 25% of city rooftops within five years."

Electric vehicle infrastructure receives major investment with plans to install 500 new charging stations across the city, including in underserved neighborhoods. The city fleet will transition entirely to electric vehicles by 2028, with incentives for residents to make the switch. Local dealerships are partnering with the program to offer special pricing on electric vehicles.

A complete overhaul of the city's recycling program introduces smart bins with RFID technology that rewards residents for proper recycling. "We're moving from a punitive system to an incentive-based approach," explained Waste Management Director Rodriguez. The new system includes curbside composting pickup and expanded recycling categories.

The plan allocates $10 million for urban reforestation, planting 10,000 trees in parks and along streets over the next three years. "Trees are natural carbon sinks that also improve air quality and reduce urban heat," noted Parks Commissioner Thompson. The initiative includes community planting events where residents can adopt and care for new trees.

Business incentives encourage green practices with tax breaks for companies achieving specific sustainability benchmarks. A Green Business Certification program will recognize leaders in environmental responsibility. The mayor emphasized that the plan creates "green jobs" while protecting the environment for future generations.

Public feedback sessions will be held throughout February, with implementation of the first phase beginning in April. The complete plan is available on the city website, with detailed timelines and progress tracking tools for residents to monitor achievements.`,
      image_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop",
      date: "2024-01-09"
    },
    {
      title: "Summer Nights Film Festival Returns with Classic Movies",
      category: "Entertainment",
      content: `The beloved Summer Nights Film Festival makes its triumphant return to Central Park next month, offering free outdoor screenings of cinematic classics under the stars. This year's expanded program features 12 films over six weekends, with new amenities and enhanced viewing experiences for all ages.

The lineup includes timeless favorites such as 'Casablanca,' 'The Wizard of Oz,' 'Star Wars: A New Hope,' 'Jurassic Park,' and 'The Princess Bride.' Festival director Michael Chen explained the selection process: "We've chosen films that have stood the test of time and continue to captivate audiences across generations."

New this year is the Family Fun Zone, opening two hours before each screening with activities including face painting, film-themed crafts, and movie trivia contests. "We want to create a complete entertainment experience, not just a movie screening," said Community Events Coordinator Lisa Martinez. Local food trucks will offer diverse cuisine options, from gourmet popcorn to international street food.

Technology upgrades include a state-of-the-art 40-foot inflatable screen with 4K projection and surround sound. "The visual and audio quality will rival commercial theaters," promised Technical Director Robert Williams. For those who prefer a more intimate experience, a "quiet zone" with individual wireless headphones will be available.

The festival introduces themed weekends, starting with "Science Fiction Saturday" featuring 'Star Wars' and 'Back to the Future,' followed by "Musical Magic Sunday" with 'The Sound of Music' and 'Mary Poppins.' Each screening will be preceded by short documentaries about the film's historical context and production.

Sustainability is a key focus, with zero-waste initiatives, composting stations, and reusable cup programs. "We're proving that large events can be both enjoyable and environmentally responsible," emphasized Green Events Coordinator Sarah Johnson.

Attendees are encouraged to bring blankets, low-back chairs, and picnic baskets. The festival runs every Friday and Saturday in July and August, with screenings beginning at dusk (approximately 8:30 PM). No tickets are required, but early arrival is recommended for optimal seating.`,
      image_url: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=800&auto=format&fit=crop",
      date: "2024-01-08"
    },
    {
      title: "Downtown Farmers Market Expands to Weekend Operations",
      category: "Local",
      content: `Responding to overwhelming community demand, the popular Downtown Farmers Market will expand to both Saturdays and Sundays starting next month, creating new opportunities for local farmers and artisans while providing residents with expanded access to fresh, locally-sourced products.

The expansion transforms the market from a Saturday-only event to a full weekend destination, operating from 8 AM to 2 PM on both days. "This has been the number one request from our community for years," said Market Manager Maria Rodriguez. "We're excited to double the opportunities for people to shop local and support our regional economy."

The Saturday market will focus on traditional farm produce, with over 50 vendors offering seasonal fruits and vegetables, organic eggs, grass-fed meats, and artisanal cheeses. Sunday introduces a "Maker's Market" concept featuring local craftspeople, artists, bakers, and prepared food vendors. "We're creating distinct experiences for each day while maintaining our commitment to local producers," Rodriguez explained.

New vendors include three organic vegetable farms from the surrounding county, a cooperative of women-owned food businesses, and a microbrewery featuring locally-sourced ingredients. The market will also host cooking demonstrations, nutrition workshops, and children's activities throughout the weekend.

Accessibility improvements include expanded parking with shuttle service from satellite lots, increased ADA-compliant spaces, and new covered seating areas. "We want everyone to feel welcome and comfortable," emphasized Community Outreach Director James Wilson. A new mobile app will provide real-time vendor maps, product availability updates, and pre-ordering options.

Economic impact studies project the expansion will generate an additional $1.5 million in annual revenue for local producers while creating 25 new jobs. "This isn't just about shopping," noted Economic Development Commissioner Chen. "It's about building a sustainable local food system and strengthening community connections."

Special opening weekend celebrations are planned with live music, sampling stations, and vendor discounts. The market expansion represents phase one of a three-year plan to establish the downtown area as a regional hub for local commerce and community gathering.`,
      image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
      date: "2024-01-07"
    },
    {
      title: "$15 Million Riverside Soccer Complex Breaks Ground",
      category: "Sports",
      content: `Construction officially began today on the state-of-the-art $15 million Riverside Soccer Complex, a transformative project that will establish the city as a regional sports tourism destination. The groundbreaking ceremony attracted hundreds of community members, local officials, and youth soccer players eager to witness the start of this landmark development.

The complex will feature eight professional-grade soccer fields, including two with artificial turf for year-round use and six natural grass fields meticulously designed to professional specifications. "This facility will be among the best in the state," promised Project Manager Robert Chen. "We're creating a venue that can host regional and national tournaments while serving our local community."

Infrastructure includes modern locker rooms with team meeting spaces, a central pavilion with concession stands and viewing areas, and a community center housing offices for local sports organizations. The complex will be fully ADA-compliant with accessible seating, parking, and pathways throughout the 50-acre site.

Funding comes from an innovative public-private partnership combining city bonds, state grants, and corporate sponsorships. "This model ensures the facility will be self-sustaining while keeping costs reasonable for local users," explained Finance Director Lisa Martinez. Naming rights for the main stadium have been secured by a local healthcare provider.

Youth soccer organizations are particularly excited about the development. "This gives our players access to facilities that were previously only available in larger cities," said Youth Soccer Association President Michael Thompson. The complex will host after-school programs, summer camps, and coaching clinics for players of all skill levels.

Economic projections estimate the complex will generate $5 million annually in tourism revenue, with tournaments attracting teams from across the region. Local hotels and restaurants are already preparing for increased business. "This is exactly the type of investment that benefits the entire community," noted Chamber of Commerce Director Sarah Johnson.

Construction is scheduled in phases, with the first four fields expected to open by fall. The complete complex will be fully operational by next spring, with a grand opening tournament already planned for May. Community members can follow construction progress through live webcams and monthly public tours.`,
      image_url: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop",
      date: "2024-01-06"
    },
    {
      title: "Architectural Design Revealed for New Central Library",
      category: "Politics",
      content: `After two years of planning and community input, the architectural design for the new Central Library was unveiled today to enthusiastic applause. The $45 million project represents a bold vision for 21st-century learning, blending cutting-edge technology with sustainable design principles in a striking modern structure.

Designed by award-winning architect Maria Chen of Chen + Partners, the building features a stunning glass façade that maximizes natural light while providing panoramic views of downtown. "We wanted to create a transparent, inviting space that symbolizes the openness of knowledge," Chen explained during the presentation. The design incorporates a dramatic atrium rising three stories, with floating staircases and interactive digital displays.

Sustainability is central to the design, with solar panels covering 80% of the roof, rainwater harvesting systems for irrigation and plumbing, and geothermal heating and cooling. "This will be the city's first net-zero energy public building," announced Sustainability Director Robert Williams. The building is projected to produce more energy than it consumes through these innovative systems.

The interior layout reimagines traditional library spaces with flexible zones for different activities. A Digital Innovation Lab will offer 3D printers, VR stations, and recording studios. "We're moving beyond books to become a hub for digital creativity and learning," said Library Director Dr. Sarah Thompson. The children's area features interactive learning walls and a storytelling amphitheater.

Community spaces include a 200-seat auditorium for lectures and performances, study rooms with video conferencing capabilities, and a café operated by a local entrepreneur. "This is more than a library - it's a community living room," emphasized Community Engagement Coordinator Lisa Rodriguez. Outdoor spaces include reading gardens, public art installations, and a rooftop terrace with city views.

The project has secured $30 million in public funding with the remaining $15 million coming from private donations and grants. A capital campaign launches next month with naming opportunities for various spaces within the library. Construction is scheduled to begin in March, with completion expected in 18 months.

Public feedback sessions will continue through the design development phase, with opportunities for community input on interior details and programming. The current library will remain operational throughout construction, with a seamless transition planned for the new facility's opening in late 2025.`,
      image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop",
      date: "2024-01-05"
    },
    {
      title: "Local Band 'The Midnight Drivers' Signs Major Record Deal",
      category: "Entertainment",
      content: `In a development that has sent waves of excitement through the local music scene, rising stars 'The Midnight Drivers' have officially signed a major record deal with Universal Music Group. The announcement marks a significant milestone for the five-member band, who have been building their reputation through relentless touring and a distinctive sound that blends rock authenticity with folk sensibility.

The deal, negotiated over several months, includes recording of a debut album, national tour support, and comprehensive marketing backing. "This is everything we've worked for since we started playing together in high school," said lead vocalist and guitarist Michael Johnson, visibly emotional during the press conference. "We're grateful to our local fans who believed in us from day one."

Band members credit their unique sound - described as "heartland rock meets indie folk" - to diverse musical influences and collaborative songwriting. Keyboardist Sarah Chen explained their creative process: "We draw from everything - classic rock, Americana, even some electronic elements. The result is something that feels both familiar and fresh."

The band's journey from local venues to major label interest is a testament to their work ethic and community support. They gained initial attention through weekly performances at downtown clubs, building a loyal following through energetic live shows and genuine audience engagement. "We never canceled a show, even when only five people showed up," recalled bassist Alex Rodriguez. "Those early days taught us everything about connecting with listeners."

The debut album, tentatively titled "Open Road," will be recorded this spring with Grammy-winning producer David Miller. "We're excited to capture the energy of our live performances while exploring new sonic territories in the studio," said drummer James Wilson. The album features 12 original tracks, including fan favorites from their live sets and new compositions written specifically for the recording.

Local music venues and businesses are celebrating the news as validation of the city's vibrant music scene. "The Midnight Drivers' success shows that world-class talent can come from anywhere," said Music Commission Director Lisa Martinez. "This puts our city on the musical map in a new way."

The band plans to maintain strong local connections despite their expanding national profile. A hometown celebration concert is scheduled for next month, with proceeds benefiting music education programs in local schools. National tour dates will be announced next week, with the album release planned for early fall.`,
      image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop",
      date: "2024-01-04"
    }
  ];

  // First, check if we have any data
  db.get("SELECT COUNT(*) as count FROM articles", (err, row) => {
    if (err) {
      console.error('❌ Error checking data:', err.message);
      return;
    }
    
    if (row.count === 0) {
      console.log('📝 Inserting sample data...');
      
      const insertSQL = `
        INSERT INTO articles (title, category, content, image_url, date) 
        VALUES (?, ?, ?, ?, ?)
      `;
      
      const stmt = db.prepare(insertSQL);
      let insertedCount = 0;
      
      sampleArticles.forEach((article, index) => {
        stmt.run(
          article.title,
          article.category,
          article.content,
          article.image_url,
          article.date,
          function(err) {
            if (err) {
              console.error(`❌ Error inserting article ${index + 1}:`, err.message);
            } else {
              insertedCount++;
              console.log(`  ✓ Inserted: ${article.title}`);
            }
            
            // Finalize after all inserts
            if (index === sampleArticles.length - 1) {
              setTimeout(() => {
                stmt.finalize();
                console.log(`\n✅ Successfully inserted ${insertedCount} articles`);
                console.log('🎯 Database initialization complete!');
              }, 100);
            }
          }
        );
      });
    } else {
      console.log(`✅ Database already contains ${row.count} articles`);
    }
  });
}

// API Routes

// Root endpoint - show API info
app.get('/', (req, res) => {
  res.json({
    message: 'Local News API',
    version: '1.0.0',
    endpoints: {
      getAllArticles: 'GET /articles',
      getByCategory: 'GET /articles/:category',
      getArticleById: 'GET /article/:id',
      categories: ['Local', 'Politics', 'Sports', 'Entertainment']
    }
  });
});

// Get all articles
app.get('/articles', (req, res) => {
  console.log('📄 GET /articles - Fetching all articles');
  
  db.all("SELECT * FROM articles ORDER BY date DESC", (err, rows) => {
    if (err) {
      console.error('❌ Database error:', err.message);
      res.status(500).json({ 
        error: err.message,
        details: 'Failed to fetch articles from database'
      });
      return;
    }
    
    console.log(`✅ Found ${rows.length} articles`);
    res.json(rows);
  });
});

// Get articles by category
app.get('/articles/:category', (req, res) => {
  const category = req.params.category;
  const validCategories = ['Local', 'Politics', 'Sports', 'Entertainment'];
  
  console.log(`📄 GET /articles/${category} - Fetching articles by category`);
  
  if (!validCategories.includes(category)) {
    res.status(400).json({ 
      error: 'Invalid category',
      validCategories: validCategories 
    });
    return;
  }
  
  const sql = "SELECT * FROM articles WHERE category = ? ORDER BY date DESC";
  
  db.all(sql, [category], (err, rows) => {
    if (err) {
      console.error('❌ Database error:', err.message);
      res.status(500).json({ 
        error: err.message,
        details: 'Failed to fetch articles by category'
      });
      return;
    }
    
    console.log(`✅ Found ${rows.length} articles in ${category} category`);
    res.json(rows);
  });
});

// Get single article by ID (NEW ENDPOINT)
app.get('/article/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  console.log(`📄 GET /article/${id} - Fetching single article`);
  
  if (isNaN(id)) {
    res.status(400).json({ 
      error: 'Invalid article ID',
      details: 'Article ID must be a number'
    });
    return;
  }
  
  const sql = "SELECT * FROM articles WHERE id = ?";
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('❌ Database error:', err.message);
      res.status(500).json({ 
        error: err.message,
        details: 'Failed to fetch article from database'
      });
      return;
    }
    
    if (!row) {
      console.log(`❌ Article ${id} not found`);
      res.status(404).json({ 
        error: 'Article not found',
        details: `No article found with ID ${id}`
      });
      return;
    }
    
    console.log(`✅ Found article: ${row.title}`);
    res.json(row);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  db.get("SELECT 1 as status", (err) => {
    if (err) {
      res.status(500).json({ 
        status: 'unhealthy',
        database: 'disconnected',
        error: err.message 
      });
    } else {
      res.json({ 
        status: 'healthy',
        database: 'connected',
        timestamp: new Date().toISOString()
      });
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.path 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Local News Server Started!
─────────────────────────────
📡 Port: ${PORT}
🔗 Local: http://localhost:${PORT}
📊 API Endpoints:
   • http://localhost:${PORT}/articles
   • http://localhost:${PORT}/articles/:category
   • http://localhost:${PORT}/article/:id
   • http://localhost:${PORT}/health
   
🌐 Frontend should be at: http://localhost:3000
─────────────────────────────
`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err.message);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
});