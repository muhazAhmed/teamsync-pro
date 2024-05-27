import clientModal from "../../models/services/client.js";

export const newClientData = async (req, res) => {
  try {
    let data = req.body;
    let { page_id, pageName } = data;
    if (!pageName)
      return res.status(400).json("Server Error, Unable to create Page Name");

    if (pageName) {
      const fetchLastPageId = await clientModal.find({});
      if (fetchLastPageId.length === 0) {
        data.page_id = pageName + "-" + 10;
      } else {
        const lastData = await clientModal.findOne().sort({ page_id: -1 });
        const page = lastData.split("-")[0];
        const newIndex = parseInt(lastData.split("-")[1]) + 1;
        data.page_id = page + "-" + newIndex;
      }
    }

    const response = await clientModal.create(data);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const getOneClientData = async (req, res) => {
  try {
    const id = req.params.id;
    const fetchData = await client.findOne({ page_id, id });
    if (!fetchData) return res.status(400).json("Page Name Not Found");
    return res.status(200).json(fetchData);
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const getAllClientData = async (req, res) => {
  try {
    const fetchData = await clientModal.find();
    return res.status(200).json(fetchData);
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const updateClientData = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const deleteClientData = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};
