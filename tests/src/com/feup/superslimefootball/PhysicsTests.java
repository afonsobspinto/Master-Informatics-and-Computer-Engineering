/*******************************************************************************
 * Copyright 2015 See AUTHORS file.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

package com.feup.superslimefootball;

import com.feup.superslimefootball.view.utilities.GameConfig;

import org.junit.Assert;
import org.junit.Test;

public class PhysicsTests {


	@Test
	public void testInitialScore(){
		Assert.assertTrue("Score starts 0-0", GameConfig.getInstance().getScore().getPlayer1()==0);
	}

	@Test
	public void testSlimeMovement(){
		SuperSlimeFootball game = new SuperSlimeFootball();
		//GameConfig g =
	}
}
