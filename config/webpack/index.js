import ProductionConfig from './config.production'
import DevelopmentConfig from './config.development'

import Res from '@res/core'

export default (Res.production ? ProductionConfig : DevelopmentConfig)
