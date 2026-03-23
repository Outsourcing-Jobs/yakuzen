const paginate = async (model, query = {}, options = {}) => {
  const page = parseInt(options.page) > 0 ? parseInt(options.page) : 1
  const limit = parseInt(options.limit) > 0 ? parseInt(options.limit) : 10
  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    model
      .find(query)
      .skip(skip)
      .limit(limit)
      .populate(options.populate || ''),
    model.countDocuments(query)
  ])

  const totalPages = Math.ceil(total / limit)

  return {
    data,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit
    }
  }
}

module.exports = paginate
