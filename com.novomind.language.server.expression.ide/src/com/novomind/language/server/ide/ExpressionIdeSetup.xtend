/*
 * generated by Xtext 2.18.0
 */
package com.novomind.language.server.ide

import com.google.inject.Guice
import com.novomind.language.server.ExpressionRuntimeModule
import com.novomind.language.server.ExpressionStandaloneSetup
import org.eclipse.xtext.util.Modules2

/**
 * Initialization support for running Xtext languages as language servers.
 */
class ExpressionIdeSetup extends ExpressionStandaloneSetup {

	override createInjector() {
		Guice.createInjector(Modules2.mixin(new ExpressionRuntimeModule, new ExpressionIdeModule))
	}
	
}