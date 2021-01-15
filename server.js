const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server");
const API_URL = "http://localhost:3004";
const GOREST_API_URL = "https://gorest.co.in/public-api/";
const HOBBIT_API_URL = "http://d3efb86d1c5c.ngrok.io/";

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

  type FilterValues {
    id: String
    name: String
  }

  type CategoryFilter {
    id: String
    name: String
    values: [FilterValues]
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

  type FooterSocial {
    link: String
  }

  type Footer {
    columns: [FooterColumn]
    social: [FooterSocial]
    copyright: String
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
    contentModal: ContentModalStyles
    mobileNavBar: MobileBarStyles
  }

  type BottomBarStyles {
    background: String
    color: String
    fontSize: String
  }

  type FooterLinksStyles {
    color: String
  }

  type FooterStyles {
    bottomBar: BottomBarStyles
    footerLinks: FooterLinksStyles
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

  type BodyStyles {
    background: String
    fontFamily: String
    color: String
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
    paper: DrawerStyles
    list: DrawerListStyles
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
    closeButton: CloseButtonStyles
  }

  type ModalHeaderStyles {
    background: String
    color: String
  }
  type ModalBodyStyles {
    background: String
  }
  type ModalStyles {
    header: ModalHeaderStyles
    body: ModalBodyStyles
    closeButton: CloseButtonStyles
  }

  type PageStyles {
    body: BodyStyles
    header: HeaderStyles
    footer: FooterStyles
    detailsModal: DetailsModalStyles
    modalStyles: ModalStyles
  }

  type Page {
    id: ID
    name: String
    logo: String
    coverImage: String
    description: String
    headerMenu: [Menu]
    blogLink: String
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
    hoverImage: String
    description: String
    price: String
    specifications: String
    warranties: String
    category: String
    attributes: [ProductAttribute]
    gallery: [Slide]
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

  type User {
    id: ID
    departmentID: Int
    username: String
    password: String
    userAlias: String
    avatarPhotoLink: String
    userType: String
    isLegalPerson: Boolean
    userLastName: String
    userFirstName: String
    address1Text: String
    address2Text: String
    cityName: String
    stateCode: String
    postalCode: String
    countryCode: String
    landlineNumber: Int
    faxNumber: Int
    cellPhoneNumber: String
    alternateEmail: String
    userEmail: String
    website: String
    userIDType: String
    userIDNumber: String
    userDOBDate: String
    userTaxCode: String
    userTaxCUITL: String
    store: Boolean
    storeContact: Boolean
    supplier: Boolean
    supplierContact: Boolean
    shipper: Boolean
    shipperContact: Boolean
    pymntChannel: Boolean
    pymntChContact: Boolean
    customer: Boolean
    subscriber: Boolean
    member: Boolean
    blogger: Boolean
    userFacebookLink: String
    userTwitterLink: String
    userInstagramLink: String
    userPinterestLink: String
    subscriptionEmail: String
    userStatus: String
    createdDatime: String
    modifByID: String
    modifDatime: String
  }

  type Department {
    id: ID
    departmentID: String
    departmentNumber: String
    departmentName: String
    userID: String
    contactID: String
    deptCategoryNumber: Int
    deptStatus: String
    placeHolderSinceDate: String
    placeHolderThruDate: String
    placeHolderType: String
    placeHolderCode: String
    contractLink: String
    deptDefaultImageLink: String
    deptLogoLink: String
    campaignID: String
    gridDefaultPositionIndex: String
    gridPromotedPositionIndex: String
    deptPriorityNumber: String
    modifiedDatime: String
    createdDatime: String
    createdByID: String
    campaigning: String
    modifiedByID: String
  }

  input DepartmentInput {
    departmentName: String
    departmentID: Int
  }
  type DepartmentResponse {
    id: ID
    departmentName: String
  }

  type Campaign {
    id: ID
    campaignNumber: String
    departmentID: Int
    productID: String
    campaignType: String
    campaignOccurrence: String
    gridPositionIndex: Int
    promotedFromDatime: String
    promotedToDatime: String
    campaignStatus: String
  }

  type Producto {
    id: ID
    productNumber: String
    departmentID: String
    productSKU: String
    productEAN: String
    productShortName: String
    productDescription: String
    prodCategoryCode: Int
    prodSubcategoryCode: Int
    brandCode: String
    modelCode: String
    yearCode: String
    styleCode: String
    genderCode: String
    packagingCode: String
    materialCode: String
    colorCode: String
    sizeCode: String
    flavorCode: String
    attribMask: String
    attributeMapCode: String
    prodUOMCode: String
    prodUnitsInStockNumber: String
    inventoryCostMethod: String
    prodUnitCostAmount: String
    prodMSRPAmount: String
    prodUnitPriceAmount: String
    prodCurrencyType: String
    prodDiscountType: Int
    prodDiscountCondition: String
    prodDiscountNumber: String
    prodPriceCorrectionFactor: String
    prodUnitsOnOrder: String
    prodReplenishType: String
    prodUISThresholdNumber: String
    pendReplenOrderNumber: Int
    prodRankingType: Int
    prodStatus: String
    prodLocation1Text: Int
    prodLocation2Text: Int
    prodSpecifications: String
    prodNotes: String
    prodDefaultContentLink: String
    prodDefaultHoverLink: String
    supplier1ID: String
    supplier1ProdID: String
    supplier2ID: String
    supplier2ProdID: String
    isCampaigning: Boolean
    campaignID: String
    gridPromotedPositionIndex: Int
    gridDefaulPositiontIndex: Int
    prodPriorityNumber: String
  }

  type SiteCMS {
    siteID: ID
    siteTitleText: String
    siteMetaDescriptionText: String
    siteLogoLink: String
    ourServMissionJson: String
    ourServWhoWeRJson: String
    ourServBoardJson: String
    ourServFeaturesJson: String
    ourServMmbshipJson: String
    tourDefaultLink: String
    event1DefaultLink: String
    event2DefaultLink: String
    event3DefaultLink: String
    contactUsJson: String
    blogLink: String
    slide1DefaultLink: String
    slide2DefaultLink: String
    slide3DefaultLink: String
    slide4DefaultLink: String
    slide5DefaultLink: String
    footerHistoryJson: String
    sitePoliciesJson: String
    siteMembersPolicyJson: String
    siteCustomrsPolicyJson: String
    siteVisitorsPolicyJson: String
    siteMainColorRGB: String
    siteBodyColorRGB: String
    siteFontNameText: String
    siteMainFontColorText: String
    siteBodyFontColorText: String
    siteFacebookLink: String
    siteTwitterLink: String
    siteInstagramLink: String
    sitePinterestLink: String
    siteCopyrights: String
  }
  input AppearanceInput {
    siteLogoLink: String
    siteMainColorRGB: String
    siteBodyColorRGB: String
    siteFontNameText: String
    siteMainFontColorText: String
    siteBodyFontColorText: String
  }

  type CUMessage {
    id: ID
    messageNumber: Int
    emailAddress: String
    departmentID: Int
    userID: Int
    customerID: Int
    subscriberID: Int
    messageType: String
    lastAndFirstName: String
    companyName: String
    messageSubject: String
    messageBody: String
    createdDatime: String
    communicatedTo: Int
    communicatedDatime: String
    level1EscalatedTo: Int
    level1EscalationDatime: String
    level2EscalatedTo: Int
    level2EscalationDatime: String
    modifiedByID: Int
    modifiedDatime: String
    resolvedByID: Int
    resolvedDatime: String
    approvedByID: Int
    approvedDatime: String
    resolutionText: String
    messageStatus: String
  }

  type Event {
    id: ID
    username: String
    departmentID: Int
    userType: String
    fullName: String
    cellPhoneNumber: Int
    userStatus: String
    eventDatime: String
    eventCategory: String
    eventType: String
    activity: String
    originatorID: Int
    eventStart: String
    eventEnd: String
    eventOutcome: String
    deviceName: String
    deviceIPaddress: String
    eventSeverity: String
    eventStatus: String
    eventRetention: String
  }

  type Replenishment {
    id: ID
    replenishmentOrderNr: String
    departmentID: String
    supplierID: String
    repGenDatime: String
    repPlacedDatime: String
    repOrderStatus: String
    repLineItemNr: String
    productID: String
    supplierProductID: String
    quantityOrdered: String
    quantityReceived: String
    estimatedUnitCost: String
    actualUnitCost: String
    dateFulfilled: String
    repLIStatus: String
  }

  input UserInput {
    id: ID
    username: String
    password: String
    userType: String
    isLegalPerson: String
    userLastName: String
    userFirstName: String
    address1Text: String
    address2Text: String
    cityName: String
    stateCode: String
    postalCode: String
    countryCode: String
    landlineNumber: String
    faxNumber: String
    cellPhoneNumber: String
    userEmail: String
    website: String
    userIDType: String
    userIDNumber: String
    userDOBDate: String
    userTaxCode: String
    userTaxCUITL: String
    isStore: String
    isStoreContact: String
    isCustomer: String
    isSupplier: String
    isShipper: String
    isMember: String
    userFacebookLink: String
    userTwitterLink: String
    userInstagramLink: String
    userPinterestLink: String
    subscriptionEmail: String
    userStatus: String
  }

  input ContentInput {
    id: ID
    content: String
  }
  type ContentResponse {
    id: ID
    content: String
  }
  type GenericResponse {
    id: ID
  }
  type NewContent {
    id: ID
    content: String
    sectionId: String
    title: String
  }
  type UserSaved {
    userLastName: String
    userFirstName: String
  }

  input MessageInput {
    content: String
    author: String
  }
  type Message {
    id: ID!
    content: String
    author: String
  }

  type UserCredentials {
    token: String
    userType: Int
    userName: String
    store: Int
  }
  type AuthPayload {
    token: String
    user: String
  }

  type UserLogged {
    id: ID!
    name: String!
    email: String!
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
    createUser(input: UserInput): UserSaved
    login(email: String!, password: String!, store: Int!): UserCredentials
    addTodo(type: String!): Message
    addDepartment(department: DepartmentInput): DepartmentResponse
    updateContent(id: ID, content: ContentInput): ContentResponse
    updateAppearance(id: ID, appearance: AppearanceInput): GenericResponse
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    pages: [Page]
    page(id: ID!): Page
    storeGrid(storeId: ID!): [Product]
    content(storeId: ID!, sectionId: String): Content
    product(id: ID!): Product
    users: [User]
    user(id: ID!): User
    departments: [Department]
    department(id: ID!): Department
    campaign(id: ID!): Campaign
    campaigns(departmentID: ID!): [Campaign]
    productos(departmentID: ID!): [Producto]
    producto(id: ID!): Producto
    replenishments(departmentID: ID!): [Replenishment]
    newContent(id: ID): NewContent
    siteCMS(id: ID): SiteCMS
    cuMessage(id: ID): CUMessage
    cuMessages: [CUMessage]
    event(id: ID): Event
    events: [Event]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Mutation: {
    createMessage: (parent, args) => {
      const { input } = args;
      console.log(input);
      // Create a random id for our "database".
      //var id = require('crypto').randomBytes(10).toString('hex')

      //fakeDatabase[id] = input
      return { id: "1", content: "String", author: "String" };
    },
    updateMessage: ({ id, input }) => {
      /*if (!fakeDatabase[id]) {
        throw new Error("no message exists with id " + id)
      }
      // This replaces all old data, but some apps might want partial update.
      fakeDatabase[id] = input*/
      return { id: "1", content: "String", author: "String" };
    },
    createUser: (parent, args) => {
      const { input } = args;
      console.log(input);
      // Create a random id for our "database".
      //var id = require('crypto').randomBytes(10).toString('hex')
      saveUser({ input });
      //fakeDatabase[id] = input
      return { id: "1", userLastName: "String", userFirstName: "String" };
    },

    login: (parent, args) => {
      console.log(args);
      const { email, password, store } = args;

      const users = [
        "superUser",
        "siteManager",
        "siteAdmin",
        "siteStaff",
        "departmentManager",
        "departmentAdmin",
        "departmentStaff",
      ];

      const credentials = {
        superUser: {
          token: "TheToken",
          userType: 1,
          userName: "superUser",
          store: 0,
        },
        siteManager: {
          token: "TheToken",
          userType: 2,
          userName: "siteManager",
          store: 0,
        },
        siteAdmin: {
          token: "TheToken",
          userType: 3,
          userName: "siteAdmin",
          store: 0,
        },
        siteStaff: {
          token: "TheToken",
          userType: 4,
          userName: "siteStaff",
          store: 0,
        },
        store01Manager: {
          token: "TheToken",
          userType: 5,
          userName: "store01Manager",
          store: 1,
        },
        store01Admin: {
          token: "TheToken",
          userType: 6,
          userName: "store01Admin",
          store: 1,
        },
        store01Staff: {
          token: "TheToken",
          userType: 7,
          userName: "store01Staff",
          store: 1,
        },
        store02Manager: {
          token: "TheToken",
          userType: 5,
          userName: "store02Manager",
          store: 2,
        },
        store02Admin: {
          token: "TheToken",
          userType: 6,
          userName: "store02Admin",
          store: 2,
        },
        store02Staff: {
          token: "TheToken",
          userType: 7,
          userName: "store02Staff",
          store: 2,
        },
        store03Manager: {
          token: "TheToken",
          userType: 5,
          userName: "store03Manager",
          store: 3,
        },
        store03Admin: {
          token: "TheToken",
          userType: 6,
          userName: "store03Admin",
          store: 3,
        },
        store03Staff: {
          token: "TheToken",
          userType: 7,
          userName: "store03Staff",
          store: 3,
        },
      };

      return credentials[email] !== undefined
        ? credentials[email] && credentials[email].store === store
          ? credentials[email]
          : { token: "none" }
        : { token: "none" };
    },

    addTodo: (parent, args) => {
      console.log(args);

      return { id: "1", content: "String", author: "String" };
    },

    addDepartment: (parent, args) => {
      const { department } = args;
      //console.log(department);
      return saveDepartment({ department });
    },

    updateContent: (parent, args) => {
      const { id, content } = args;
      return updateContent({ id, content });
    },
    updateAppearance: (parent, args) => {
      const { id, appearance } = args;
      return updateAppearance({ id, appearance });
    },
  },
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
      const { id } = args;
      return fetchProduct({ id });
    },
    users: (parent, args) => fetchUsers(),
    user: (parent, args) => {
      const { id } = args;
      return fetchUser({ id });
    },
    departments: (parent, args) => fetchDepartments(),
    department: (parent, args) => {
      const { id } = args;
      return fetchDepartment({ id });
    },
    campaigns: (parent, args) => {
      const { departmentID } = args;
      return fetchCampaigns({ departmentID });
    },
    campaign: (parent, args) => {
      const { id } = args;
      return fetchCampaign({ id });
    },
    productos: (parent, args) => fetchProductos(),

    productos: (parent, args) => {
      const { departmentID } = args;
      return fetchProductos({ departmentID });
    },
    producto: (parent, args) => {
      const { id } = args;
      return fetchProducto({ id });
    },
    replenishments: (parent, args) => {
      const { departmentID } = args;
      return fetchReplenishments({ departmentID });
    },

    newContent: (parent, args) => {
      const { id } = args;
      return fetchNewContent({ id });
    },
    siteCMS: (parent, args) => {
      const { id } = args;
      return fetchSiteCMS({ id });
    },
    cuMessage: (parent, args) => {
      const { id } = args;
      return fetchCUMessage({ id });
    },
    cuMessages: (parent, args) => {
      return fetchCUMessages();
    },
    event: (parent, args) => {
      const { id } = args;
      return fetchEvent({ id });
    },
    events: (parent, args) => {
      return fetchEvents();
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
    API_URL + "/products/" + (storeId ? "?storeId=" + storeId : "")
  ).then((res) => res.json());
}

function fetchProduct({ id }) {
  return fetch(API_URL + "/products/?id=" + id)
    .then((res) => res.json())
    .then((json) => json[0]);
}

function fetchPages({ id }) {
  return fetch(API_URL + "/pages/" + (id ? id : "")).then((res) => res.json());
}

function fetchContent({ storeId, sectionId }) {
  return fetch(
    API_URL +
      "/sectionsContent" +
      (storeId ? "?pageId=" + storeId : "") +
      (sectionId ? "&sectionId=" + sectionId : "")
  )
    .then((res) => res.json())
    .then((json) => json[0]);
}

function fetchNewContent({ id }) {
  return fetch(HOBBIT_API_URL + "/content/" + id)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchUsers() {
  return fetch(HOBBIT_API_URL + "users/")
    .then((res) => res.json())
    .then((json) => json);
}
function fetchUser({ id }) {
  return fetch(HOBBIT_API_URL + "users/" + id)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchDepartments() {
  return fetch(HOBBIT_API_URL + "departments/")
    .then((res) => res.json())
    .then((json) => json);
}

function fetchDepartment({ id }) {
  return fetch(HOBBIT_API_URL + "departments/" + id)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchCUMessages() {
  return fetch(HOBBIT_API_URL + "incidents/")
    .then((res) => res.json())
    .then((json) => json);
}
function fetchCUMessage({ id }) {
  return fetch(HOBBIT_API_URL + "incidents/" + id)
    .then((res) => res.json())
    .then((json) => json);
}
function fetchEvents() {
  return fetch(HOBBIT_API_URL + "events/")
    .then((res) => res.json())
    .then((json) => json);
}
function fetchEvent({ id }) {
  return fetch(HOBBIT_API_URL + "events/" + id)
    .then((res) => res.json())
    .then((json) => json);
}

function saveDepartment({ department }) {
  console.log(JSON.stringify(department));
  return fetch(HOBBIT_API_URL + "departments/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);

      return { id: json.id, departmentName: json.departmentName };
    });
}

function updateContent({ id, content }) {
  console.log(id, content);
  console.log(JSON.stringify(content));
  return fetch(HOBBIT_API_URL + "content/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return { id: json.id, content: json.content };
    });
}

function updateAppearance({ id, appearance }) {
  return fetch(HOBBIT_API_URL + "cms/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appearance),
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return { id: json.siteID };
    });
}
function fetchCampaigns({ departmentID }) {
  return fetch(HOBBIT_API_URL + "campaigns/department/" + departmentID)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}

function fetchCampaign({ id }) {
  return fetch(HOBBIT_API_URL + "campaigns/" + id)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchSiteCMS({ id }) {
  return fetch(HOBBIT_API_URL + "cms/" + id)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchProductos({ departmentID }) {
  return fetch(HOBBIT_API_URL + "products/department/" + departmentID)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchProducto({ id }) {
  return fetch(HOBBIT_API_URL + "products/" + id)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchReplenishments({ departmentID }) {
  return fetch(HOBBIT_API_URL + "replenishments/department/" + departmentID)
    .then((res) => res.json())
    .then((json) => json);
}

function saveUser({ input }) {
  return fetch(HOBBIT_API_URL + "users/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((res) => {
      //console.log(res);
      return res.json();
    })
    .then((json) => {
      //console.log(json);
      return json;
    });
}

function loginUser({ input }) {
  return fetch(HOBBIT_API_URL + "users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((json) => json.data);
}
