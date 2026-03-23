const TOS = require('../models/TOS');

exports.getTOS = async (req, res) => {
  try {
    let tos = await TOS.findOne();
    if (!tos) {
      tos = new TOS({
        title: 'TERMS OF SERVICE',
        sections: [
          {
            badge: 'READ FIRST',
            heading: 'IMPORTANT RULES',
            contentBlocks: [
              '<span class="warn">Absolutely do not</span> use my work for <em>AI / NFTs / software</em>.',
              'Do <em>not</em> use my work without permission.'
            ],
            order: 1
          }
        ],
        ctaLinks: [
          { label: 'VGEN', url: '#', icon: '◈', order: 1 }
        ]
      });
      await tos.save();
    }
    
    // Sort logic nếu cần
    tos.sections.sort((a, b) => a.order - b.order);
    tos.ctaLinks.sort((a, b) => a.order - b.order);

    res.json(tos);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.updateTOS = async (req, res) => {
  try {
    const { title, sections, ctaLinks } = req.body;
    let tos = await TOS.findOne();
    
    if (!tos) {
      tos = new TOS({ title, sections, ctaLinks });
    } else {
      if (title) tos.title = title;
      if (sections) tos.sections = sections;
      if (ctaLinks) tos.ctaLinks = ctaLinks;
    }

    await tos.save();
    res.json({ message: 'Update TOS thành công', tos });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật TOS', error: error.message });
  }
};
