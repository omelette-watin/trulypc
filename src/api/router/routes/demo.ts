import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

import rand from "@/utils/rand";
import { createAdminRouter } from "../createAdminRouter";

export const demoRouter = createAdminRouter().query("seed", {
  resolve: async ({ ctx }) => {
    const { prisma } = ctx;

    await prisma.companies.createMany({
      data: [
        {
          name: "Smartrade",
          addressLine1: "1 RUE DE STOCKHOLM",
          city: "Paris",
          countryCode: "FR",
          kybStatus: "APPROVED",
          legalForm: "SAS",
          registration: "76047183800011",
          zipCode: "75008",
        },
        {
          name: "Tulyp",
          addressLine1: "1 RUE DE STOCKHOLM",
          city: "Paris",
          countryCode: "FR",
          kybStatus: "APPROVED",
          legalForm: "SAS",
          registration: "91047183800011",
          zipCode: "75008",
        },
        {
          name: "GoPro",
          addressLine1: "3891 Ranchview Dr. Richardson",
          addressLine2: "San Toledo",
          city: "Paris",
          countryCode: "US",
          kybStatus: "APPROVED",
          legalForm: "SAS",
          registration: "457654321",
          state: "California",
          zipCode: "62639",
        },
        {
          name: "Dell",
          addressLine1: "The Boulevard",
          addressLine2: "Cain Road",
          city: "Bracknell",
          countryCode: "UK",
          kybStatus: "APPROVED",
          legalForm: "SAS",
          registration: "123456789",
          state: "Berkshire",
          zipCode: "RG12 1LF",
        },
        {
          name: "Hooli",
          addressLine1: "32 avenue du lac",
          city: "Nanterre",
          kybStatus: "APPROVED",
          countryCode: "FR",
          legalForm: "SAS",
          registration: "98765432100032",
          zipCode: "92050",
        },
      ],
    });

    const [
      _smartradeCompany,
      tulypCompany,
      goproCompany,
      dellCompany,
      hooliCompany,
    ] = await prisma.companies.findMany();

    const hash = await bcrypt.hash("Password1!", 10);

    await prisma.users.createMany({
      data: [
        {
          role: "ADMIN",
          companyId: tulypCompany!.id,
          email: "tulyp@tulyp.io",
          firstName: "Admin",
          gender: "FEMALE",
          lastName: "ADMIN",
          passwordHash: hash,
          phone: "+336927407453",
          residenceCountryCode: "FR",
        },
        {
          role: "CUSTOMER",
          companyId: tulypCompany!.id,
          email: "customer@tulyp.io",
          firstName: "Maxime",
          gender: "MALE",
          lastName: "Girres",
          passwordHash: hash,
          phone: "+33690807060",
          residenceCountryCode: "FR",
        },
        {
          role: "PARTNER",
          email: "j.smith@gopro.fak",
          firstName: "John",
          lastName: "Smith",
          gender: "MALE",
          phone: "+33790807060",
          residenceCountryCode: "FR",
          companyId: goproCompany!.id,
          passwordHash: hash,
        },
        {
          role: "PARTNER",
          email: "t.goloth@dell.fak",
          firstName: "Terry",
          lastName: "Goloth",
          gender: "MALE",
          phone: "+33560807060",
          residenceCountryCode: "FR",
          companyId: dellCompany!.id,
          passwordHash: hash,
        },
        {
          role: "PARTNER",
          email: "g.belson@hooli.xyz",
          firstName: "Gavin",
          lastName: "Belson",
          gender: "MALE",
          phone: "+1 (319) 555-0115",
          residenceCountryCode: "FR",
          companyId: hooliCompany!.id,
          passwordHash: hash,
        },
      ],
    });

    const [admin, tulypCustomer, goproPartner, dellPartner, hooliPartner] =
      await prisma.users.findMany();

    await prisma.admins.create({
      data: {
        id: admin!.id,
      },
    });

    await prisma.customers.create({
      data: {
        id: tulypCustomer!.id,
        birthDate: faker.date.past(rand(20, 50)),
        birthCity: faker.address.cityName(),
        birthZipCode: faker.address.zipCode(),
        birthCountryCode: "FR",
        identificationDocumentType: "ID",
        identificationDocumentNumber: "123456789 A",
        isShareholder: true,
        kycStatus: "APPROVED",
        title: "CEO",
      },
    });

    await prisma.partners.createMany({
      data: [
        {
          id: goproPartner!.id,
        },
        {
          id: dellPartner!.id,
        },
        {
          id: hooliPartner!.id,
        },
      ],
    });

    await prisma.partnerInvitations.createMany({
      data: [goproPartner!, dellPartner!, hooliPartner!].map(
        ({ id, firstName, lastName, phone, email }, index) => ({
          firstName,
          lastName,
          phone,
          email,
          companyName: [goproCompany!, dellCompany!, hooliCompany!][index]!
            .name,
          customerId: tulypCustomer!.id,
          partnerId: id,
        })
      ),
    });

    const [goproPartnerInvitation, dellPartnerInvitation] =
      await prisma.partnerInvitations.findMany();

    await prisma.wallets.create({
      data: {
        customerId: tulypCustomer!.id,
        ewalletReferenceId: "customer@tulyp.io-W1658921910",
        status: "ACT",
      },
    });

    const wallet = await prisma.wallets.findFirst();

    await prisma.virtualAccountNumbers.createMany({
      data: [
        {
          currencyCode: "USD",
          iban: "FR4717569000509571784882Q21",
          issuedBankAccount: "issuing_64c7c4c32189fa8689ec9fe050aff3d9",
          status: "ACT",
          walletId: wallet!.id,
        },
        {
          currencyCode: "USD",
          iban: "FR7117569000701937535166P72",
          issuedBankAccount: "issuing_64c7c4c32189fa8689ec9fe050ade849",
          status: "ACT",
          walletId: wallet!.id,
        },
      ],
    });

    const virtualAccountNumbers = await prisma.virtualAccountNumbers.findMany();

    await prisma.deals.createMany({
      data: [
        {
          agreementDate: new Date("7/19/2022"),
          amount: 1500000,
          currencyCode: "USD",
          customerId: tulypCustomer!.id,
          deliveryAddressLine1: "1 rue de Stockholm",
          deliveryCity: "Paris",
          deliveryCountryCode: "FR",
          deliveryZipCode: "75008",
          description:
            "Cameras to setup our youtube studio team in our Paris HQ.",
          direction: "BUYER",
          dispatchDate: new Date("8/8/2022"),
          escrowFees: 106593,
          feesPaidBy: "BUYER",
          incoterm: "CIF",
          name: "GoPro Paris HQ studio material deal",
          partnerInvitationId: goproPartnerInvitation!.id,
          portOfDischarge: "Le Havre, France",
          portOfLoading: "Shanghaï, China",
          shippingMethod: "SEA",
          status: "ACTIVE",
          tulypDealId: "customer@tulyp.io-D1658921910",
          typeOfShipping: "FCL",
          virtualAccountNumberId: virtualAccountNumbers[0]!.id,
        },
        {
          agreementDate: new Date("7/19/2022"),
          amount: 5000000,
          currencyCode: "USD",
          customerId: tulypCustomer!.id,
          deliveryAddressLine1: "1 rue de Stockholm",
          deliveryCity: "Paris",
          deliveryCountryCode: "FR",
          deliveryZipCode: "75008",
          description:
            "Remote office material: 15 laptops X one generation, 15 standing desks, 15 Dell Q792246 monitors",
          direction: "BUYER",
          dispatchDate: new Date("8/8/2022"),
          escrowFees: 106593,
          feesPaidBy: "BUYER",
          incoterm: "CIF",
          name: "Dell office material deal",
          partnerInvitationId: dellPartnerInvitation!.id,
          portOfDischarge: "Le Havre, France",
          portOfLoading: "Los Angeles Harbor, USA",
          shippingMethod: "AIR",
          status: "ACTIVE",
          tulypDealId: "mg@tulyp.io-D1658918760",

          typeOfShipping: "FCL",
          virtualAccountNumberId: virtualAccountNumbers[1]!.id,
        },
      ],
    });

    const deals = await prisma.deals.findMany();

    await prisma.paymentReleaseRequirements.createMany({
      data: [
        {
          dealId: deals[0]!.id,
          requirementType: "COMMERCIAL_DOCUMENTS",
          status: "TO_REVIEW",
          task: "",
        },
        {
          dealId: deals[0]!.id,
          requirementType: "SHIPPING_CONFIRMATION",
          status: "TO_REVIEW",
          task: "",
        },
        {
          dealId: deals[1]!.id,
          requirementType: "COMMERCIAL_DOCUMENTS",
          status: "TO_REVIEW",
          task: "",
        },
        {
          dealId: deals[1]!.id,
          requirementType: "SHIPPING_CONFIRMATION",
          status: "TO_REVIEW",
          task: "",
        },
      ],
    });

    const requirements = await prisma.paymentReleaseRequirements.findMany();

    await prisma.paymentReleaseRequirementDocFiles.createMany({
      data: [
        {
          feedback: "",
          approvalStatus: "UNDEFINED",
          fileName: "Certificate.jpg",
          paymentReleaseRequirementId: requirements[0]!.id,
          referTo: "CERTIFICATE_OF_ORIGINS",
          documentAvailability: "UPLOADED",
          task: "",
          uri: "",
        },
        {
          feedback: "",
          approvalStatus: "UNDEFINED",
          fileName: "Invoice.pdf",
          paymentReleaseRequirementId: requirements[0]!.id,
          referTo: "COMMERCIAL_INVOICE",
          documentAvailability: "UPLOADED",
          task: "",
          uri: "",
        },
        {
          feedback: "",
          approvalStatus: "APPROVED",
          fileName: "Packing.pdf",
          paymentReleaseRequirementId: requirements[0]!.id,
          referTo: "PACKING_LIST",
          documentAvailability: "UPLOADED",
          task: "",
          uri: "",
        },
      ],
    });

    return "Done, good luck 🙏";
  },
});
