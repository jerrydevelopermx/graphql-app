const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server");

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type SubMenu {
    text: String
    action: String
  }

  type Menu {
    type: String
    label: String
    url: String
    action: String
    items: [SubMenu]
  }

  type Slide {
    img: String
    text: String
  }

  type CategoryFilter {
    id: String
    name: String
    values: [String]
  }

  type Category {
    id: String
    name: String
    filters: [CategoryFilter]
  }
  type Video {
    autoPlay: Boolean
    poster: String
    src: String
  }

  type FooterColumnOption {
    text: String
    url: String
  }

  type FooterColumn {
    id: String
    title: String
    options: [FooterColumnOption]
    social: [String]
  }

  type Footer {
    copyright: String
    columns: [FooterColumn]
  }

  type ToolbarSecondaryStyle {
    justifyContent: String
    overflowX: String
    marginTop: String
  }

  type ToolbarLinkStyle {
    width: String
    padding: String
    flexShrink: String
  }

  type HeaderActiveStyle {
    color: String
  }

  type HoverHeaderMenu {
    textDecoration: String
    cursor: String
  }
  type HeaderMenuStyle {
    color: String
    fontSize: String
    textDecoration: String
    width: String
    textAlign: String
  }

  type TopBarStyle {
    background: String
    height: String
  }

  type PaperMenuStyle {
    backgroundColor: String
    color: String
  }
  type StyledMenuStyle {
    paper: PaperMenuStyle
  }

  type HoverMenuItemStyle {
    backgroundColor: String
  }
  type RootMenuItemStyle {
    hover: HoverMenuItemStyle
  }

  type StyledMenuItemStyle {
    root: RootMenuItemStyle
  }

  type HeaderStyles {
    topBar: TopBarStyle
    toolbarSecondary: ToolbarSecondaryStyle
    toolbarLink: ToolbarLinkStyle
    headerActive: HeaderActiveStyle
    headerMenu: HeaderMenuStyle
    styledMenu: StyledMenuStyle
    styledMenuItem: StyledMenuItemStyle
  }

  type BottomBarStyles {
    background: String
    padding: String
    color: String
    fontSize: String
  }

  type FooterColumnStyles {
    width: String
    margin: String
    textAlign: String
  }

  type FooterLinksStyles {
    color: String
    textDecoration: String
  }

  type CenteredContentStyles {
    margin: String
    textAlign: String
  }

  type SocialMediaIconsStyles {
    width: String
    margin: String
  }

  type FooterStyles {
    bottomBar: BottomBarStyles
    footerColumn: FooterColumnStyles
    footerLinks: FooterLinksStyles
    centeredContent: CenteredContentStyles
    socialMediaIcons: SocialMediaIconsStyles
  }

  type SearchContentStyles {
    border: String
    padding: String
    margin: String
  }

  type SearchFieldStyles {
    margin: String
    minWidth: String
    borderCollapse: String
    borderRadius: String
  }

  type SearchFilterStyles {
    searchContent: SearchContentStyles
    searchField: SearchFieldStyles
  }

  type VideoContainerStyles {
    marginTop: String
    marginBottom: String
  }

  type VideoPlayerStyles {
    margin: String
    width: String
    textAlign: String
  }

  type VideoStyles {
    videoContainer: VideoContainerStyles
    videoPlayer: VideoPlayerStyles
  }

  type SliderStyles {
    marginTop: String
    textAlign: String
  }

  type CardGridStyles {
    paddingTop: String
    paddingBottom: String
  }

  type CardStyles {
    height: String
    display: String
    flexDirection: String
  }

  type CardMediaStyles {
    paddingTop: String
  }

  type CardContentStyles {
    flexGrow: String
  }

  type GridStyles {
    cardGrid: CardGridStyles
    card: CardStyles
    cardMedia: CardMediaStyles
    cardContent: CardContentStyles
  }

  type BodyStyles {
    background: String
    fontFamily: String
  }

  type ModalsHeaderStyles {
    background: String
    color: String
  }

  type ModalsBodyStyles {
    background: String
  }

  type BackgroundStyle {
    backgroundColor: String
  }
  type RootStyle {
    color: String
    backgroundColor: String
    hover: BackgroundStyle
  }
  type CloseButtonStyles {
    root: RootStyle
  }

  type ContentModalStyles {
    contentModalsHeader: ModalsHeaderStyles
    contentModalsBody: ModalsBodyStyles
    closeButton: CloseButtonStyles
  }

  type DrawerStyles {
    background: String
    color: String
  }
  type DrawerListStyles {
    width: String
  }

  type MobileBarStyles {
    drawer: DrawerStyles
    drawerList: DrawerListStyles
  }

  type DetailsHeaderStyles {
    background: String
    color: String
  }

  type DetailsBodyStyles {
    background: String
  }
  type DetailsModalStyles {
    detailsHeader: DetailsHeaderStyles
    detailsBody: DetailsBodyStyles
  }

  type ButtonStyle {
    root: RootStyle
  }
  type ButtonsStyles {
    closeModal: ButtonStyle
    addToCart: ButtonStyle
    wishList: ButtonStyle
    checkout: ButtonStyle
    viewMore: ButtonStyle
  }
  type PageStyles {
    body: BodyStyles
    header: HeaderStyles
    footer: FooterStyles
    searchFilter: SearchFilterStyles
    video: VideoStyles
    slider: SliderStyles
    grid: GridStyles
    contentModal: ContentModalStyles
    mobileNavBar: MobileBarStyles
    detailsModal: DetailsModalStyles
    buttons: ButtonsStyles
  }

  type Page {
    id: ID
    name: String
    logo: String
    coverImage: String
    description: String
    headerMenu: [Menu]
    slides: [Slide]
    categories: [Category]
    offers: [Slide]
    video: Video
    footer: Footer
    styles: PageStyles
  }

  type ProductAttribute {
    name: String
    values: [String]
  }

  type Product {
    id: ID
    storeId: String
    type: String
    categoryId: String
    color: String
    size: String
    style: String
    material: String
    name: String
    coverImage: String
    description: String
    price: String
    specifications: String
    warranties: String
    category: String
    attributes: [ProductAttribute]
  }

  type ContentItem {
    type: String
    text: String
  }

  type Content {
    pageId: ID
    sectionId: String
    title: String
    content: [ContentItem]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    pages: [Page]
    page(id: ID!): Page
    storeGrid(storeId: ID!): [Product]
    content(storeId: ID!, sectionId: String): Content
    product(storeId: String, id: ID!): Product
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    storeGrid: (parent, args) => {
      const { storeId } = args;
      return fetchProducts({ storeId });
    },
    pages: () => fetchPages(),
    page: (parent, args) => {
      const { id } = args;
      return fetchPages({ id });
    },
    content: (parent, args) => {
      const { storeId, sectionId } = args;
      return fetchContent({ storeId, sectionId });
    },
    product: (parent, args) => {
      const { storeId, id } = args;
      return fetchProduct({ storeId, id });
    },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    reportSchema: true,
    variant: "current",
  },
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

function fetchProducts({ storeId }) {
  return fetch(
    "http://d86a0f04e298.ngrok.io/products/" +
      (storeId ? "?storeId=" + storeId : "")
  ).then((res) => res.json());
}

function fetchProduct({ storeId, id }) {
  return fetch(
    "http://d86a0f04e298.ngrok.io/products/" +
      (storeId ? "?storeId=" + storeId : "") +
      "&id=" +
      id
  )
    .then((res) => res.json())
    .then((json) => json[0]);
}

function fetchPages({ id }) {
  return fetch(
    "http://d86a0f04e298.ngrok.io/pages/" + (id ? id : "")
  ).then((res) => res.json());
}

function fetchContent({ storeId, sectionId }) {
  return fetch(
    "http://d86a0f04e298.ngrok.io/sectionsContent" +
      (storeId ? "?pageId=" + storeId : "") +
      (sectionId ? "&sectionId=" + sectionId : "")
  )
    .then((res) => res.json())
    .then((json) => json[0]);
}

function fetchCharacters() {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://rickandmortyapi.com/api/character/")
    .then((res) => res.json())
    .then((json) => json.results);
}
