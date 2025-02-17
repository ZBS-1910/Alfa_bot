require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  console.error("❌ BOT_TOKEN is missing in .env file.");
  process.exit(1);
}

const bot = new Telegraf(botToken);
// Start Command
bot.start((ctx) => {
  ctx.reply(
    "Hi... Welcome to Alfa 🤖\n\nHere I am available to help you..🤩",
    Markup.keyboard([
      ["/help", "/admin"],
      ["/weather", "/news"],
      ["/translate", "/crypto"],
      ["/joke", "/remind"],
      ["/quote", "/fact"],
      ["/dice", "/covid"],
      ["/Currencyconvert", "/reverse"],
      ["/toss", "/echo"],
    ]).resize()
  );
});

// Help Command
bot.help((ctx) => {
  ctx.reply(`🆘 Here are the available commands:
  /start - Start the bot
  /help - Show help message
  /weather [city] - Get weather info
  /news - Get latest news
  /translate [text] - Translate text
  /joke - Get a random joke
  /crypto [coin] - Get cryptocurrency price
  /remind [seconds] [message] - Set a reminder
  /fact - Get a random fact
  /dice - Roll a dice
  /quote - Get a daily quote
  /covid [country] - Get COVID-19 status
  /echo [text] - Echo your message
  /Currencyconvert [amount] [from] [to] - Convert currency
  /reverse [text] - Reverse your message
  /toss - Toss a coin
`);
});

// Admin Command
bot.command("admin", (ctx) => {
  ctx.replyWithPhoto(
    { source: "./hiBot.jpg" }, // Replace with the actual path to your image
    {
      caption: `
<b> My creator is Mr. Zam</b>

<b> Here are the details about him...😜</b>

👤 <b>Name:</b>     Zameer Basha  
📧 <b>Email:</b>    <a href="mailto:zameer.ge19@gmail.com">zameer.ge19@gmail.com</a>  
📞 <b>Phone:</b>     <a href="tel:+91963200XXX8">963200XXX8</a>  

🔗 <b>Contact me:</b>  
🔵 <b>LinkedIn:</b>     <a href="https://www.linkedin.com/in/zameer-basha-s-45a5b4324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Click Here</a>  
🐙 <b>GitHub:</b>       <a href="https://github.com/ZBS-1910">Click Here</a>  
📸 <b>Instagram:</b>    <a href="https://www.instagram.com/zb_s_1910/">Click Here</a>  
🎨 <b>Portfolio:</b>    <a href="https://your-portfolio-link.com">Click Here</a>  
💬 <b> Chat me:</b> <a href="https://t.me/your-telegram-chat">Click Here</a>  
`,
      parse_mode: "HTML",
    }
  );
});

// Weather Command
bot.command("weather", async (ctx) => {
  try {
    const city = ctx.message.text.split(" ").slice(1).join(" ").trim();
    if (!city)
      return ctx.reply("🌤 Please provide a city name: /weather London");

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) return ctx.reply("Weather API key is missing.");

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // 🔍 Check if the API response contains the expected data
    if (data.cod !== 200) {
      console.error(`API Error: ${data.message}`);
      return ctx.reply(`❌ Error: ${data.message}`);
    }

    // ✅ Valid response, proceed with weather data
    ctx.reply(`🌤 Weather in ${data.name}:
  Temperature: ${data.main.temp}°C
  Description: ${data.weather[0].description}`);
  } catch (error) {
    console.error("Fetch Error:", error);
    ctx.reply("Error getting weather information. Please try again later.");
  }

}); 

//News commands
const { fetch } = require("undici");


bot.command("news", async (ctx) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) return ctx.reply("News API key is missing.");

    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    console.log("Fetching from:", apiUrl);

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "error") {
      console.error("News API Error:", data.message);
      return ctx.reply(`Error fetching news: ${data.message}`);
    }

    if (!data.articles || data.articles.length === 0) {
      return ctx.reply("No news available at the moment.");
    }

    let newsMessage = "📰 *Latest News:*\n";
    data.articles.slice(0, 3).forEach((article) => {
      newsMessage += `🔹 *${article.title}*\n[Read More](${article.url})\n\n`;
    });

    ctx.replyWithMarkdown(newsMessage);
  } catch (error) {
    console.error(error);
    ctx.reply("Error fetching news.");
  }
});

// Translate Command
const translateText = require("./translator.js"); // Import translator module
bot.command("translate", async (ctx) => {
  const args = ctx.message.text.split(" ");

  if (args.length < 3) {
    return ctx.reply(
      "⚠ Usage: /translate <target-language> <text>\nExample: /translate en नमस्ते दुनिया"
    );
  }

  const toLang = args[1].toLowerCase().trim(); // Ensure lowercase and trim spaces
  const text = args.slice(2).join(" "); // Extract text

  const translatedText = await translateText(text, "auto", toLang);
  ctx.reply(`🔤 **Translation:**\n${translatedText}`);
});

// Joke Command
bot.command("joke", async (ctx) => {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = await response.json();
    ctx.reply(`😂 ${data.setup}\n\n${data.punchline}`);
  } catch (error) {
    console.error(error);
    ctx.reply("Error fetching joke.");
  }
});

// Cryptocurrency Price Command
bot.command("crypto", async (ctx) => {
  try {
    const crypto = ctx.message.text.split(" ")[1] || "bitcoin";
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`
    );
    const data = await response.json();

    if (!data[crypto])
      return ctx.reply("Cryptocurrency not found. Try /crypto bitcoin");

    ctx.reply(`💰 ${crypto.toUpperCase()} Price: $${data[crypto].usd}`);
  } catch (error) {
    console.error(error);
    ctx.reply("Error fetching cryptocurrency price.");
  }
});

// Reminder Command
bot.command("remind", (ctx) => {
  const messageParts = ctx.message.text.split(" ");
  const time = parseInt(messageParts[1]);
  const reminderText = messageParts.slice(2).join(" ");

  if (!time || !reminderText)
    return ctx.reply("Usage: /remind 10 Take a break (in seconds)");

  ctx.reply(`⏳ Reminder set for ${time} seconds.`);
  setTimeout(() => {
    ctx.reply(`⏰ Reminder: ${reminderText}`);
  }, time * 1000);
});

// Random Fact Command
bot.command("fact", async (ctx) => {
  try {
    const response = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const data = await response.json();
    ctx.reply(`🤓 Random Fact: ${data.text}`);
  } catch (error) {
    console.error(error);
    ctx.reply("Error fetching fact.");
  }
});

// Dice Roll Command
bot.command("dice", (ctx) => {
  const roll = Math.floor(Math.random() * 6) + 1;
  ctx.reply(`🎲 You rolled a ${roll}`);
});

// Quote Command
bot.command("quote", async (ctx) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || !data[0]?.q || !data[0]?.a) {
      throw new Error("Invalid response from API");
    }

    ctx.reply(`💡 *"${data[0].q}"*\n- _${data[0].a}_`);
  } catch (error) {
    console.error(`❌ Quote Fetch Error:`, error);
    ctx.reply("⚠ Unable to fetch a quote right now. Try again later.");
  } 
});

// COVID-19 Stats Command
bot.command("covid", async (ctx) => {
  try {
    const country = ctx.message.text.split(" ")[1] || "India";
    const response = await fetch(
      `https://disease.sh/v3/covid-19/countries/${country}`
    );
    const data = await response.json();

    if (data.message) return ctx.reply("Country not found. Try /covid India");

    ctx.reply(`🦠 COVID-19 Stats for ${data.country}:
Cases: ${data.cases}
Deaths: ${data.deaths}
Recovered: ${data.recovered}`);
  } catch (error) {
    console.error(error);
    ctx.reply("Error fetching COVID-19 stats.");
  }
});

// Echo Command
bot.command("echo", (ctx) => {
  const text = ctx.message.text.split(" ").slice(1).join(" ");
  if (!text) return ctx.reply("Usage: /echo Hello!");
  ctx.reply(text);
});

// Currency Converter Command
bot.command("Currencyconvert", async (ctx) => {
  const args = ctx.message.text.trim().split(/\s+/);

  if (args.length < 4) {
    return ctx.reply("Usage: /Currencyconvert 100 USD INR");
  }

  const amount = parseFloat(args[1]);
  const fromCurrency = args[2].toUpperCase();
  const toCurrency = args[3].toUpperCase();

  if (isNaN(amount) || amount <= 0) {
    return ctx.reply("⚠ Please enter a valid amount (e.g., 100).");
  }

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates.");
    }

    const data = await response.json();

    if (!data.rates || !data.rates[toCurrency]) {
      return ctx.reply("⚠ Invalid currency code.");
    }

    const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
    ctx.reply(
      `💱 ${amount} ${fromCurrency} = *${convertedAmount} ${toCurrency}*`
    );
  } catch (error) {
    console.error("Currency Conversion Error:", error);
    ctx.reply("⚠ Error converting currency. Please try again later.");
  }
});

bot.command("toss", async (ctx) => {
  const outcomes = [" 🗣 Heads", "🪙 Tails"];
  const result = outcomes[Math.floor(Math.random() * outcomes.length)];

  ctx.reply(` Coin Toss Result: ${result}`);
});

bot.on("message", (ctx) => {
  // Check if the message is a sticker
  if (ctx.message.sticker) {
    ctx.reply("👍"); // Reply with a thumbs-up emoji for stickers
  }
  // Check if the message is text and not a command
  else if (ctx.message.text && !ctx.message.text.startsWith("/")) {
    ctx.reply(
      "I can't understand humans...!😔\n\nPlease contact my creator....🤗\n\n/admin"
    );
  }
});

// Start the bot
bot.launch();
console.log("✅ Bot started.");
