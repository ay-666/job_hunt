import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    let { name, description, location, website } = req.body;
    if (!name) {
      return res.status(400).json({
        msg: "Company name is required.",
        success: false,
      });
    }

    const company = await Company.findOne({ name: name });

    if (company) {
      return res.status(400).json({
        msg: "Company with same name already exists.",
        success: false,
      });
    }

    const userId = req.id;

    if (!description) description = "";
    if (!location) location = "";
    if (!website) website = "";
    const logo = "";

    let comp = {
      name: name,
      description: description,
      location: location,
      website: website,
      logo: logo,
      userId: userId,
    };

    const newCompany = await Company.create(comp);

    return res.status(200).json({
      msg: "Company registered.",
      newCompany,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId: userId });
    if (!companies) {
      return res.status(404).json({
        msg: "No company found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        msg: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;

    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        msg: "Company not found.",
        success: false,
      });
    }

    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        public_id: `${company._id}/logo`,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });
      if(cloudResponse){
        company.logo = cloudResponse.secure_url;
        
      }
    }

    await company.save();

    return res.status(200).json({
      msg: "Company Info updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
