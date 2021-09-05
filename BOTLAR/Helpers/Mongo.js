class Mongoose {
  static Connect(URL = ayarlar.MongoURL) {
          require('mongoose').connect(URL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false
          }).then(() => {
            client.logger.log("MongooDb Bağlantısı Kuruldu Hrrr", "mngdb")
          }).catch((err) => {
            client.logger.log("MongoDb Bağlantısı Kurulamadı Miuw :( " + err, "mngdb");
          });
  }
}

module.exports = { Mongoose }