"use strict";

let mongoose = require("mongoose");
const utils = require("../utils/index");

//Get user_tokens from DB
let getData = function (Model, criteria, projection, options, callback) {
  console.log(criteria, "---dddd-----11111111111================", projection);

  return Model.find(criteria, projection, options, callback);
};
let findOne = function (Model, criteria, projection, options, callback) {
  return Model.findOne(criteria, projection, options, callback);
};

let insertMany = function (Model, objToSave, callback) {
  // console.log(Model, "+++++FBDFBHFBHFBFHBBFHBFE", objToSave)

  return Model.insertMany(objToSave);
};

let insertOne = function (Model, objToSave, callback) {
  // console.log(Model, "+++++FBDFBHFBHFBFHBBFHBFE", objToSave)

  return new Model(objToSave).save(callback);
};

let createData = function (Model, objToSave, callback) {
  // console.log(Model, "+++++FBDFBHFBHFBFHBBFHBFE", objToSave)

  return new Model(objToSave).save(callback);
};

// Delete many in DB

//Update user_tokens in DB
let updateData = function (Model, criteria, dataToSet, options, callback) {
  // console.log('---dddd-----',Model,criteria, dataToSet)
  return Model.findOneAndUpdate(criteria, dataToSet, options, callback);
};

let updateMultipleData = function (
  Model,
  criteria,
  dataToSet,
  options,
  callback
) {
  return Model.update(criteria, dataToSet, options, callback);
};
let deleteOne = function (Model, criteria, dataToSet, options, callback) {
  // console.log('---dddd-----',Model,criteria, dataToSet)
  return Model.deleteOne(criteria);
};

let deleteMany = function (Model, criteria, dataToSet, options, callback) {
  // console.log('---dddd-----',Model,criteria, dataToSet)
  return Model.deleteMany(criteria);
};
// let updateMultipleData = function (Model,criteria, dataToSet, options, callback) {
//     return Model.update(criteria, dataToSet, options, callback);
// };

let dataPopulate = function (
  Model,
  criteria,
  project,
  options,
  populateModelArr,
  callback
) {
  return Model.find(criteria, project, options)
    .populate(populateModelArr)
    .exec(callback);
};
let dataPopulateWithPagination = function (
  Model,
  criteria,
  project,
  options,
  paginationData,
  populateModelArr,
  callback
) {
  return Model.find(criteria, project, options)
    .skip(parseInt(paginationData.skip))
    .limit(parseInt(paginationData.limit))
    .sort({ _id: -1 })
    .populate(populateModelArr)
    .exec(callback);
};

let dataAggregation = function (Model, pipeline, callback) {
  console.log("-------^^^--------", pipeline);
  return Model.aggregate(pipeline).exec(callback);
};

let dataAggregationWithPagination = function (
  Model,
  pipeline,
  page,
  pageLimit,
  callback
) {
  return Model.aggregate(pipeline)
    .skip(utils.offset(page, pageLimit))
    .limit(utils.pageLimit(pageLimit))
    .then(function (data) {
      if (data.length >= 1) {
        pipeline = utils.recordCount(pipeline);
        const result = data;
        return utils.getListMapperWithPaginationFromAggregate(
          result,
          Model.aggregate(pipeline),
          page,
          utils.pageLimit(pageLimit)
        );
      } else {
        return utils.getBlankListMapper();
      }
    });
};

let updateMultipleInsert = function (Model, arr) {
  return Model.insertMany(arr);
};

let dataCount = function (Model, criteria, projection, options, callback) {
  return Model.count(criteria);
};

module.exports = {
  getData: getData,
  createData: createData,
  updateData: updateData,
  updateMultipleData: updateMultipleData,
  updateMultipleInsert: updateMultipleInsert,
  dataPopulate: dataPopulate,
  dataAggregation: dataAggregation,
  dataCount: dataCount,
  insertMany: insertMany,
  dataPopulateWithPagination: dataPopulateWithPagination,
  findOne: findOne,
  insertOne: insertOne,
  dataAggregationWithPagination,
  deleteOne,
  deleteMany
};
