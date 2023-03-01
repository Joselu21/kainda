class Metas {

    static async createMeta(meta_key, meta_value, options = {}) {

        let info = {
            meta_key: meta_key,
            meta_value: meta_value,
            [this.identifier]: this[this.identifier]
        }

        await this.meta_class.create(info, { transaction: options.transaction });

        if (options.force_reload)
            await this.reload({ transaction: options.transaction });

    }

    static getMeta(meta_key, options = {}) {

        if (!options.force_only_one) {

            let aux = this.metas.filter(e => e.meta_key === meta_key);
            let data = [];
            aux.forEach(e => {
                data.push(e.meta_value);
            });
            return data;

        } else {

            let data = this.metas.filter(e => e.meta_key === meta_key);
            return (data.length > 0) ? data[0].meta_value : undefined;

        }

    }

    static async updateMeta(meta_key, meta_value, options = {}) {

        let data;
        if (options.previous_meta_value) {
            data = await this.meta_class.findOne({
                where: {
                    meta_key: meta_key,
                    meta_value: options.previous_meta_value,
                    [this.identifier]: this[this.identifier]
                },
                transaction: options.transaction
            }, { transaction: options.transaction });
        } else {
            data = await this.meta_class.findOne({
                where: {
                    meta_key: meta_key,
                    [this.identifier]: this[this.identifier]
                },
                transaction: options.transaction
            }, { transaction: options.transaction });
        }

        if (data) {
            await data.update({
                meta_value: meta_value
            }, { transaction: options.transaction });
        }

        if (options.force_reload)
            await this.reload({ transaction: options.transaction });

    }

    static async deleteMeta(meta_key, options = {}) {

        if (options.previous_meta_value) {

            await this.meta_class.destroy({
                where: {
                    meta_key: meta_key,
                    meta_value: options.previous_meta_value,
                    [this.identifier]: this[this.identifier]
                },
                transaction: options.transaction
            }, { transaction: options.transaction });

        } else {

            let data = await this.meta_class.findAll({
                where: {
                    meta_key: meta_key,
                    [this.identifier]: this[this.identifier]
                },
                transaction: options.transaction
            });

            if (data.length > 0) {
                for(let i = 0; i < data.length; i++) {
                    await data[i].destroy({ transaction: options.transaction });
                }
            }
        }

        if (options.force_reload)
            await this.reload({ transaction: options.transaction });
    }

    static async getIdFromMeta(meta_key, meta_value, meta_class = undefined) {

        if (!meta_class)
            return undefined;

        const meta = await this.meta_class.findOne({
            where: {
                meta_key: meta_key,
                meta_value: meta_value,
            }
        });

        if (meta) {
            return meta[this.identifier];
        }

        return undefined;

    }

}

module.exports = Metas;