const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server");
const API_URL = "http://localhost:3004"; //"http://779e2cbacf41.ngrok.io"; //"http://localhost:3004";
const GOREST_API_URL = "https://gorest.co.in/public-api/";
const HOBBIT_API_URL = "http://7dc91ebd5a8e.ngrok.io/";

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ QUERIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  # Page configuration settings
  type Page {
    id: ID
    name: String
    logo: String
    coverimage: String
    description: String
    bloglink: String
    slides: [Slide]
    categories: [Category]
    offers: [Slide]
    video: Video
    footer: Footer
    styles: PageStyles
  }

  type Slide { # ****************
    img: String
    text: String
  }

  type Category { # ****************
    id: String
    name: String
    filters: [CategoryFilter]
  }
  type CategoryFilter {
    id: String
    name: String
    values: [FilterValues]
  }
  type FilterValues {
    id: String
    name: String
  }

  type Video { # ****************
    src: String
  }

  type Footer { # ****************
    columns: [FooterColumn]
    social: [FooterSocial]
    copyright: String
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
  type FooterColumnOption {
    text: String
    url: String
  }

  type PageStyles { # ****************
    body: BodyStyles
    header: HeaderStyles
    footer: FooterStyles
    modalstyles: ModalStyles
  }
  type BodyStyles {
    background: String
    fontfamily: String
    color: String
  }
  type HeaderStyles {
    topbar: TopBarStyle
    headermenu: HeaderMenuStyle
    styledmenu: StyledMenuStyle
    mobilenavbar: MobileBarStyles
  }
  type TopBarStyle {
    background: String
  }
  type HeaderMenuStyle {
    color: String
  }
  type StyledMenuStyle {
    paper: PaperMenuStyle
  }
  type PaperMenuStyle {
    background: String
    color: String
  }
  type CloseButtonStyles {
    root: RootStyle
  }
  type RootStyle {
    color: String
    background: String
  }
  type MobileBarStyles {
    paper: DrawerStyles
  }
  type DrawerStyles {
    background: String
    color: String
  }

  type FooterStyles {
    bottombar: BottomBarStyles
    footerlinks: FooterLinksStyles
  }
  type BottomBarStyles {
    background: String
    color: String
  }
  type FooterLinksStyles {
    color: String
  }

  type ModalStyles {
    header: ModalHeaderStyles
    body: ModalBodyStyles
    closebutton: CloseButtonStyles
  }

  type ModalHeaderStyles {
    background: String
    color: String
  }
  type ModalBodyStyles {
    background: String
  }

  # PRODUCT QUERIES +************************
  type Product {
    id: ID
    storeId: String
    type: String
    categoryid: String
    color: String
    size: String
    style: String
    material: String
    name: String
    coverimage: String
    hoverimage: String
    description: String
    price: String
    specifications: String
    warranties: String
    category: String
    attributes: [ProductAttribute]
    gallery: [Slide]
  }
  type ProductAttribute {
    name: String
    values: [String]
  }

  # CONTENT *******************************
  type Content {
    pageId: ID
    sectionId: String
    title: String
    content: [ContentItem]
  }
  type ContentItem {
    type: String
    text: String
  }

  # USER *******************************
  type User {
    id: ID
    departmentid: Int
    username: String
    password: String
    useralias: String
    avatarphotolink: String
    usertype: String
    islegalperson: Boolean
    userlastname: String
    userfirstname: String
    address1text: String
    address2text: String
    cityname: String
    statecode: String
    postalcode: String
    countrycode: String
    landlinenumber: Int
    faxnumber: Int
    cellphonenumber: String
    alternateemail: String
    useremail: String
    website: String
    useridtype: String
    useridnumber: String
    userdobdate: String
    usertaxcode: String
    usertaxcuitl: String
    store: Boolean
    storecontact: Boolean
    supplier: Boolean
    suppliercontact: Boolean
    shipper: Boolean
    shippercontact: Boolean
    pymntchannel: Boolean
    pymntchcontact: Boolean
    customer: Boolean
    subscriber: Boolean
    member: Boolean
    blogger: Boolean
    userfacebooklink: String
    usertwitterlink: String
    userinstagramlink: String
    userpinterestlink: String
    subscriptionemail: String
    userstatus: String
    createddatime: String
    modifbyid: String
    modifdatime: String
  }

  # DEPARTMENT *******************************
  type Department {
    id: ID
    departmentid: String
    departmentnumber: String
    departmentname: String
    userid: String
    contactid: String
    deptcategorynumber: Int
    deptstatus: String
    placeholdersincedate: String
    placeholderthrudate: String
    placeholdertype: String
    placeholdercode: String
    contractlink: String
    deptdefaultimagelink: String
    deptlogolink: String
    campaignid: String
    griddefaultpositionindex: String
    gridpromotedpositionindex: String
    deptprioritynumber: String
    modifieddatime: String
    createddatime: String
    createdbyid: String
    campaigning: String
    modifiedbyid: String
  }

  # CAMPAIGN *******************************
  type Campaign {
    id: ID
    campaignnumber: String
    departmentid: Int
    productid: String
    campaigntype: String
    campaignoccurrence: String
    gridpositionindex: Int
    promotedfromdatime: String
    promotedtodatime: String
    campaignstatus: String
  }
  # PRODUCTO (ADMIN) *******************************
  type Producto {
    id: ID
    productnumber: String
    departmentid: String
    productsku: String
    productean: String
    productshortname: String
    productdescription: String
    prodcategorycode: Int
    prodsubcategorycode: Int
    brandcode: String
    modelcode: String
    yearcode: String
    stylecode: String
    gendercode: String
    packagingcode: String
    materialcode: String
    colorcode: String
    sizecode: String
    flavorcode: String
    attribmask: String
    attributemapcode: String
    produomcode: String
    produnitsinstocknumber: String
    inventorycostmethod: String
    produnitcostamount: String
    prodmsrpamount: String
    produnitpriceamount: String
    prodcurrencytype: String
    proddiscounttype: Int
    proddiscountcondition: String
    proddiscountnumber: String
    prodpricecorrectionfactor: String
    produnitsonorder: String
    prodreplenishtype: String
    produisthresholdnumber: String
    pendreplenordernumber: Int
    prodrankingtype: Int
    prodstatus: String
    prodlocation1text: Int
    prodlocation2text: Int
    prodspecifications: String
    prodnotes: String
    proddefaultcontentlink: String
    proddefaulthoverlink: String
    supplier1id: String
    supplier1prodid: String
    supplier2id: String
    supplier2prodid: String
    campaigning: Boolean
    campaignid: String
    gridpromotedpositionindex: Int
    griddefaulpositiontindex: Int
    prodprioritynumber: String
  }

  type ProdCategory {
    prodcategorycode: Int
    prodcategoryname: String
    prodcategorytext: String
    prodcategorystatus: Boolean
  }

  type ProdSubcategory {
    prodsubcategorycode: Int
    prodsubcategoryname: String
    prodsubcategorytext: String
    prodsubcategorystatus: Boolean
  }

  # SITE CMS *******************************
  type SiteCMS {
    siteid: ID
    sitetitletext: String
    sitemetadescriptiontext: String
    sitelogolink: String
    ourservmissionhtml: String
    ourservwhowerhtml: String
    ourservboardhtml: String
    ourservfeatureshtml: String
    ourservmmbshiphtml: String
    tourdefaultlink: String
    event1defaultlink: String
    event2defaultlink: String
    event3defaultlink: String
    contactushtml: String
    bloglink: String
    slide1defaultlink: String
    slide2defaultlink: String
    slide3defaultlink: String
    slide4defaultlink: String
    slide5defaultlink: String
    footerhistoryhtml: String
    sitepolicieshtml: String
    sitememberspolicyhtml: String
    sitecustomrspolicyhtml: String
    sitevisitorspolicyhtml: String
    sitemaincolorrgb: String
    sitebodycolorrgb: String
    sitefontnametext: String
    sitemainfontcolortext: String
    sitebodyfontcolortext: String
    sitefacebooklink: String
    sitetwitterlink: String
    siteinstagramlink: String
    sitepinterestlink: String
    sitecopyright: String
  }

  # SITE CMS  HTML CONTENT *******************************
  type SiteHtmlContent {
    content: String
  }
  # CU MESSAGES *******************************
  type CUMessage {
    id: ID
    messagenumber: Int
    emailaddress: String
    departmentid: Int
    userid: Int
    customerid: Int
    subscriberid: Int
    messageType: String
    lastandfirstname: String
    companyname: String
    messagesubject: String
    messagebody: String
    createddatime: String
    communicatedto: Int
    communicateddatime: String
    level1escalatedto: Int
    level1escalationdatime: String
    level2escalatedto: Int
    level2escalationdatime: String
    modifiedbyid: Int
    modifieddatime: String
    resolvedbyid: Int
    resolveddatime: String
    approvedbyid: Int
    approveddatime: String
    resolutiontext: String
    messagestatus: String
  }
  # EVENTS *******************************
  type Event {
    id: ID
    username: String
    departmentid: Int
    usertype: String
    fullname: String
    cellphonenumber: Int
    userstatus: String
    eventdatime: String
    eventcategory: String
    eventtype: String
    activity: String
    originatorid: Int
    eventstart: String
    eventend: String
    eventoutcome: String
    devicename: String
    deviceipaddress: String
    eventseverity: String
    eventstatus: String
    eventretention: String
  }
  # REPLENISHMENTS *******************************
  type Replenishment {
    id: ID
    replenishmentordernr: String
    departmentid: String
    supplierid: String
    repgendatime: String
    repplaceddatime: String
    reporderstatus: String
    replineitemnr: String
    productid: String
    supplierproductid: String
    quantityordered: String
    quantityreceived: String
    estimatedunitcost: String
    actualunitcost: String
    datefulfilled: String
    replistatus: String
  }

  # SECTIONS CONTENT *******************************

  type NewContent {
    id: ID
    content: String
    sectionId: String
    title: String
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
    replenishment(id: ID!): Replenishment
    newContent(id: ID): NewContent
    newPageContent(sectionId: String, storeId: ID!): NewContent
    siteCMS(id: ID): SiteCMS
    siteHtmlContent(id: ID, sectionId: String): SiteHtmlContent
    cuMessage(id: ID): CUMessage
    cuMessages: [CUMessage]
    event(id: ID): Event
    events: [Event]
    prodCategories: [ProdCategory]
    prodSubcategories(categoryCode: ID): [ProdSubcategory]
  }

  # ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MUTATIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  type Message {
    id: ID!
    content: String
    author: String
  }
  input MessageInput {
    content: String
    author: String
  }
  type UserSaved {
    userLastName: String
    userFirstName: String
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
  type UserCredentials {
    token: String
    userType: Int
    userName: String
    store: Int
  }
  input DepartmentInput {
    departmentName: String
    departmentID: Int
  }
  type DepartmentResponse {
    id: ID
    departmentName: String
  }

  input ContentInput {
    content: String
  }
  type ContentResponse {
    id: ID
    content: String
  }
  input AppearanceInput {
    siteLogoLink: String
    siteMainColorRGB: String
    siteBodyColorRGB: String
    siteFontNameText: String
    siteMainFontColorText: String
    siteBodyFontColorText: String
  }

  input SiteContentInput {
    siteTitleText: String
    siteMetaDescriptionText: String
    bloglink: String
    siteFacebookLink: String
    siteTwitterLink: String
    siteInstagramLink: String
    sitePinterestLink: String
    siteCopyright: String
    tourDefaultLink: String
    event1DefaultLink: String
    event2DefaultLink: String
    event3DefaultLink: String
    slide1DefaultLink: String
    slide2DefaultLink: String
    slide3DefaultLink: String
    slide4DefaultLink: String
    slide5DefaultLink: String
  }

  type GenericResponse {
    id: ID
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
    createUser(input: UserInput): UserSaved
    login(email: String!, password: String!, store: Int!): UserCredentials
    addTodo(type: String!): Message
    addDepartment(department: DepartmentInput): DepartmentResponse
    updateContent(
      id: ID
      sectionId: String
      content: ContentInput
    ): ContentResponse
    updateAppearance(id: ID, appearance: AppearanceInput): GenericResponse
    updateSiteContent(id: ID, content: SiteContentInput): GenericResponse
  }
  # ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
      const { id, sectionId, content } = args;
      return updateContent({ id, sectionId, content });
    },
    updateAppearance: (parent, args) => {
      const { id, appearance } = args;
      return updateAppearance({ id, appearance });
    },
    updateSiteContent: (parent, args) => {
      const { id, content } = args;
      console.log(args);
      return updateSiteContent({ id, content });
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
      console.log(args);
      return fetchProducto({ id });
    },
    prodCategories: (parent, args) => {
      return fetchCategories();
    },
    prodSubcategories: (parent, args) => {
      const { categoryCode } = args;
      return fetchSubcategories({ categoryCode });
    },

    replenishments: (parent, args) => {
      const { departmentID } = args;
      return fetchReplenishments({ departmentID });
    },
    replenishment: (parent, args) => {
      const { id } = args;
      return fetchReplenishment({ id });
    },
    newContent: (parent, args) => {
      const { id } = args;
      return fetchNewContent({ id });
    },
    newPageContent: (parent, args) => {
      const { sectionId, storeId } = args;
      return fetchNewPageContent({ sectionId, storeId });
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
    siteHtmlContent: (parent, args) => {
      const { id, sectionId } = args;
      return fetchHtmlContent({ id, sectionId });
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
  console.log(API_URL + "/pages/" + (id ? id : ""));
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
  return fetch(HOBBIT_API_URL + "content/" + id)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchReplenishment({ id }) {
  console.log(HOBBIT_API_URL + "replenishments/" + id);
  return fetch(HOBBIT_API_URL + "replenishments/" + id)
    .then((res) => res.json())
    .then((json) => json);
}
function fetchNewPageContent({ sectionId, storeId }) {
  return fetch(HOBBIT_API_URL + "content/" + sectionId + "/" + storeId)
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
function fetchHtmlContent({ id, sectionId }) {
  return fetch(HOBBIT_API_URL + "cms/" + id + "/" + sectionId)
    .then((res) => res.json())
    .then((json) => json);
}
function fetchEvent({ id }) {
  return fetch(HOBBIT_API_URL + "events/" + id)
    .then((res) => res.json())
    .then((json) => json);
}

function saveDepartment({ department }) {
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

function updateContent({ id, sectionId, content }) {
  console.log(id, sectionId, content);
  console.log(JSON.stringify(content));
  return fetch(HOBBIT_API_URL + "cms/" + id + "/" + sectionId, {
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

function updateSiteContent({ id, content }) {
  console.log(content);
  return fetch(HOBBIT_API_URL + "cms/" + id + "/content", {
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

function fetchCategories() {
  return fetch(HOBBIT_API_URL + "products/categories")
    .then((res) => res.json())
    .then((json) => json);
}

function fetchSubcategories({ categoryCode }) {
  return fetch(
    HOBBIT_API_URL + "products/category/" + categoryCode + "/subcategories"
  )
    .then((res) => res.json())
    .then((json) => json);
}
/*prodCategories: (parent, args) => {
  return fetchCategories();
},
prodSubcategories: (parent, args) => {
  const { categoryCode } = args;
  return fetchSubcategories({ categoryCode });
},
*/

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
