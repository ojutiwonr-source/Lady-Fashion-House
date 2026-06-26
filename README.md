# Lady Fashion House 👗

A mobile game where players can design stunning fashion outfits and showcase them on the runway!

## Game Features

✨ **Design Your Outfits**
- Select from various tops, bottoms, shoes, and accessories
- Create unique combinations and save them to your wardrobe
- Mix and match styles to express your creativity

🎭 **Runway Shows**
- Display your designed outfits on the runway
- Choose from different themes (Casual, Formal, Sporty, Bohemian, Vintage)
- Earn scores based on your outfit choices
- Get feedback from the audience

👗 **Wardrobe Management**
- View all your created outfits
- Edit or delete outfits
- Track your fashion collection

💰 **Monetization Ready**
- In-app purchases for premium fashion items
- Ad integration support for AdMob
- Cosmetics and accessories unlocks

## Project Structure

```
src/
├── screens/
│   ├── HomeScreen.tsx          # Main menu and game entry
│   ├── DesignScreen.tsx        # Outfit designer
│   ├── RunwayScreen.tsx        # Runway show display
│   └── WardrobeScreen.tsx      # Wardrobe management
├── store/
│   ├── store.ts                # Redux store configuration
│   └── reducers/
│       ├── fashionReducer.ts   # Outfit state management
│       └── runwayReducer.ts    # Show state management
└── types/
    ├── fashion.ts              # Fashion related types
    └── runway.ts               # Runway show types
```

## Tech Stack

- **Framework:** React Native
- **State Management:** Redux with Redux Thunk
- **Navigation:** React Navigation
- **Language:** TypeScript

## Installation

### Prerequisites
- Node.js (v14+)
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)

### Setup

1. Clone the repository
```bash
git clone https://github.com/ojutiwonr-source/Lady-Fashion-House.git
cd Lady-Fashion-House
```

2. Install dependencies
```bash
npm install
```

3. Install pods (iOS only)
```bash
cd ios
pod install
cd ..
```

## Running the App

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Development Server
```bash
npm start
```

## Game Mechanics

### 1. Design Phase
- Players browse available fashion items
- Select one item from each category (top, bottom, shoes)
- Optional: Add accessories
- Name the outfit and save it

### 2. Runway Phase
- Select a runway theme
- Choose an outfit from your wardrobe
- Start the show and earn points based on:
  - Theme compatibility
  - Outfit creativity
  - Audience preference

### 3. Wardrobe Management
- View all created outfits
- See detailed information about each outfit
- Delete outfits to make room for new designs

## Monetization Strategy

1. **In-App Purchases**
   - Premium fashion items (exclusive colors, brands)
   - Cosmetics and accessories
   - Theme packs

2. **Advertising**
   - Optional rewarded ads for bonus points
   - Google AdMob integration ready

3. **Subscription**
   - VIP membership for early access to new items
   - Unlimited creation tools

## Future Enhancements

- [ ] Social features (share designs with friends)
- [ ] Fashion challenges and competitions
- [ ] Seasonal collections and limited-time items
- [ ] 3D avatar and clothing preview
- [ ] Multiplayer runway battles
- [ ] Fashion trends system
- [ ] Daily rewards and achievements
- [ ] Story mode/campaign
- [ ] More clothing categories (hats, bags, jewelry)
- [ ] Custom color mixing
- [ ] Photo mode and sharing

## Development Notes

### Adding New Fashion Items
Edit `src/screens/DesignScreen.tsx` and update the `FASHION_ITEMS` object:

```typescript
const FASHION_ITEMS = {
  tops: ['Item1', 'Item2', ...],
  bottoms: ['Item1', 'Item2', ...],
  // Add more categories as needed
};
```

### Customizing Themes
Modify runway themes in `src/screens/RunwayScreen.tsx`:

```typescript
const THEMES = ['Casual', 'Formal', 'Sporty', 'Bohemian', 'Vintage'];
```

### Styling
The app uses a consistent color scheme:
- Primary: `#FF1493` (Deep Pink)
- Light: `#FFB6D9` (Pink)
- Background: `#FFF0F5` (Light Pink)

## Building for Release

### Android Release Build
```bash
npm run build:android
```

### iOS Release Build
```bash
npm run build:ios
```

## Contributing

Feel free to contribute! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions, please open a GitHub issue in this repository.

---

**Happy Designing! 👗✨**
