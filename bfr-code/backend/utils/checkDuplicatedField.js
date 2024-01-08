export const checkDuplicateField = async (model, field, value) => {
  const existingDocument = await model.findOne({ [field]: value });
  return existingDocument !== null;
};
